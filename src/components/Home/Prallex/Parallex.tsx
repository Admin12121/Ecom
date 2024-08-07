"use client"
import React, { ReactNode,useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import NextImage from "next/image";
import styles from "./ParallaxCard.module.css";
import {Image} from "@nextui-org/react";

const IMG_PADDING = 12;

export default function Parallex() {

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
      <motion.article className={styles.article} 
        ref={targetRef} 
        style={{
          opacity,
          height: `calc(90vh - ${IMG_PADDING * 2}px)`,
          top: IMG_PADDING,
          scale,
        }}>          
        <img
          style={{ width: "120%" }}
          src="https://assets.codepen.io/605876/osaka-sky.jpeg"
          alt=""
        />
        <motion.h3 >Nepal</motion.h3>
        <img className={`${styles.parallax}`} src="temp-min.png" alt="" />
        <div className={styles.blur}>
          <img src="temp-min.png" alt="" />
          <div style={{ "--index": 7 } as React.CSSProperties}></div>
        </div>
        <div className={styles.content}>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.icon}
            >
              <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Login to Explore more</span>
          </p>
          <p>Kathmandu Nepal</p>
        </div>
      </motion.article>
    </>
  );
}
