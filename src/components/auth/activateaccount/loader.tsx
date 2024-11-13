'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Loader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2') as WebGLRenderingContext;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
    camera.position.z = 500;
    const shape = new THREE.TorusGeometry(70, 20, 60, 160);
    const material = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      shininess: 20,
      opacity: 0.96,
      transparent: true,
    });
    const donut = new THREE.Mesh(shape, material);
    scene.add(donut);
    const lightTop = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightTop.position.set(0, 200, 0);
    lightTop.castShadow = true;
    scene.add(lightTop);
    const frontTop = new THREE.DirectionalLight(0xFFFFFF, 1);
    frontTop.position.set(0, 0, 300);
    frontTop.castShadow = true;
    scene.add(frontTop);
    scene.add(new THREE.AmbientLight(0xFFFFFF));
    function twist(geometry: THREE.BufferGeometry, amount: number) {
      const quaternion = new THREE.Quaternion();
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        quaternion.setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          (Math.PI / 180) * (positions[i] / amount)
        );
        const vector = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        vector.applyQuaternion(quaternion);
        positions[i] = vector.x;
        positions[i + 1] = vector.y;
        positions[i + 2] = vector.z;
      }
      geometry.attributes.position.needsUpdate = true;
    }
    let mat = Math.PI;
    let speed = Math.PI / 120;
    let forwards = 1;
    const render = () => {
      requestAnimationFrame(render);
      donut.rotation.x -= speed * forwards;
      mat -= speed;
      if (mat <= 0) {
        mat = Math.PI;
        forwards *= -1;
      }
      twist(shape, (mat >= Math.PI / 2 ? -120 : 120) * forwards);
      renderer.render(scene, camera);
    };
    render();
    return () => {
      renderer.dispose();
    };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '240px', height: '240px' }} />;
};
export default Loader;

