"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import styles from "./Prallex/ParallaxCard.module.css";
import { Image, Button } from "@nextui-org/react";

const IMG_PADDING = 12;

const Store = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  useEffect(() => {
    const UPDATE = ({ x, y }: { x: number; y: number }) => {
      gsap.set(document.documentElement, {
        "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
      });
    };

    window.addEventListener("pointermove", UPDATE);

    return () => {
      window.removeEventListener("pointermove", UPDATE);
    };
  }, []);
  return (
    <>
      <motion.article
        className={`${styles.article}`}
        ref={targetRef}
        style={{
          opacity,
          height: `calc(90vh - ${IMG_PADDING * 2}px)`,
          top: IMG_PADDING,
          scale,
        }}
      >
        <Image
          className="w-full object-cover"
          src="/store.jpg"
          isBlurred
          alt="Store image"
        />
        <a href="https://maps.app.goo.gl/RL25tcAQh8eA4Jue9" target="_blank">
          <Button className="absolute z-50 bottom-5 left-5 rounded-md h-[35px]">
            Visit us
          </Button>
        </a>
      </motion.article>
    </>
  );
};

export default Store;
