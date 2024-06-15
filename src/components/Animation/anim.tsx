export const text = {
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: { duration: 0.75, delay: 1, ease: [0.76, 0, 0.24, 1] },
        transitionEnd: { top: "47.5%" }
    },
    exit: {
        opacity: 1,
        top: "40%",
        transition: { duration: 0.5, delay: 1, ease: [0.33, 1, 0.68, 1] }
    }
};

interface CurveAnimProps {
    initial: { d: string };
    enter: { d: string; transition: { duration: number; delay: number; ease: number[] } };
    exit: { d: string; transition: { duration: number; ease: number[] } };
}

export const curve = (initialPath: string, targetPath: string): CurveAnimProps => {
    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 0.75, delay: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
        }
    };
};

export const translate = {
    initial: {
        top: "-300px"
    },
    enter: {
        top: "-100vh",
        transition: { duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] },
        transitionEnd: {
            top: "100vh"
        }
    },
    exit: {
        top: "-300px",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    }
};
