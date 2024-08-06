"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const DELAY = 300; // Fixed delay in milliseconds

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (active === null) {
      // Delay hiding the component to allow exit animation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, DELAY);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [active]);

  return (
    <div onMouseEnter={() => setActive(item)} className="">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {isVisible && (
        <AnimatePresence>
          {active === item && (
            <motion.div
              className="!left-0 absolute pt-4 w-full min-w-[95vw] top-8"
              initial={{ y: -50, opacity: 0 , scale: 0.85 }}
              animate={{ y: 0, opacity: 1 , scale: 1 }}
              exit={{ y: -10, opacity: 0 , scale: 1 }}
              transition={transition}
            >
              <div className="!left-0 absolute pt-4 w-full min-w-[95vw]">
                <motion.div
                  transition={transition}
                  layoutId="active"
                  className="bg-neutral-950 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl"
                >
                  <motion.div
                    layout
                    className="w-max h-full p-4"
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="rounded-full border border-transparent shadow-input flex justify-center space-x-4 py-6 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  href,
  src,
}: {
  title: string;
  href: string;
  src?: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2 relative">
    { src ? <Image
        src={src}
        width={200}
        height={150}
        alt={title}
        className="h-[250px] flex-shrink-0 rounded-md shadow-2xl object-cover"
      />:<span className="h-[250px] w-[200px] rounded-md shadow-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">{title}</span>}
      {src && <div className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h4 className="text-xl font-bold mb-1 text-black  dark:text-white" style={{textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"}}>
          {title}
        </h4>
      </div>}
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
