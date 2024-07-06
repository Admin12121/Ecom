'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './style.css'
import { text, curve, translate } from './anim'; // Make sure these imports are correctly defined in your anim file


interface AnimProps {
    initial?: string;
    animate?: string;
    exit?: string;
    variants?: any;
}

const anim = (variants?: any): AnimProps => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    };
};

interface CurveProps {
    children: React.ReactNode;
    backgroundColor: string;
}

const Curve: React.FC<CurveProps> = ({ children, backgroundColor }) => {

    const [dimensions, setDimensions] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null
    });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className='page curve' style={{ backgroundColor }}>
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className='background' />
            <motion.p className='route' {...anim(text)}>
                Loading
            </motion.p>
            <span className='space_animation'>
                {dimensions.width != null && <SVG height={dimensions.height!} width={dimensions.width!} />}
            </span>
            {children}
        </div>
    );
};

interface SVGProps {
    height: number;
    width: number;
}

const SVG: React.FC<SVGProps> = ({ height, width }) => {
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg className="svg_animation" {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    );
};

export default Curve;
