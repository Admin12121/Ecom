"use client"
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const LogoAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <motion.h1
      {...{
        className: cn(
          "relative text-5xl md:text-7xl font-light bg-clip-text text-transparent bg-neutral-700",
          className
        ),
      }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 20%, white 50%, transparent 80%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "-100% 0%",
      }}
      animate={{
        backgroundPosition: ["100% 0%", "-100% 0%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      }}
    >
      {children}
    </motion.h1>
  );
};

export default LogoAnimation;


import { SpringOptions, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { JSX } from 'react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as as keyof JSX.IntrinsicElements);

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn('tabular-nums', className)}>
      {display}
    </MotionComponent>
  );
}
