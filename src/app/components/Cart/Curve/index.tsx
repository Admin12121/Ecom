import React from 'react'
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

export default function Index() {

  const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight/2} 100 0`
  const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`
  
  const curve = {
    initial: {
        d: initialPath
    },
    enter: {
        d: targetPath,
        transition: {duration: 1, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        d: initialPath,
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}
    }
  }

  return (
<svg className={styles.svgCurve} xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="50%" stop-color="#18181b" />
            <stop offset="100%" stop-color="#000" />
        </radialGradient>
    </defs>
    <motion.path variants={curve} initial="initial" animate="enter" exit="exit" fill="url(#gradient)"></motion.path>
</svg>
  )
}
