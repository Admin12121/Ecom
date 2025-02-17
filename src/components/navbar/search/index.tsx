"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useUpdateQueryParams } from "@/lib/query-params";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchPostMutation } from "@/lib/store/Service/api";
import Kbd from "@/components/ui/kbd";
import { Search } from "lucide-react";
import Component from "./command";

export function PlaceholdersAndVanishInput() {
  const placeholders = React.useMemo(
    () => [
      "Enlightened Buddha statues",
      "Lotus Buddha sculpture",
      "Bodhisattva figurines",
      "Zen garden decor",
      "Meditating monk statues",
      "Tibetan prayer wheels",
      "Golden Pagoda sculptures",
      "Incense holders",
      "Mala beads and bracelets",
      "Thangka paintings",
      "Buddhist ritual items",
      "Zen garden accessories",
      "Tibetan singing bowls",
      "Mudra hand gestures",
      "Buddhist prayer flags",
      "Enlightenment artwork",
      "Buddhist meditation aids",
      "Dharma teachings",
      "Buddhist wisdom books",
      "Sacred Bodhi tree art",
    ],
    []
  );
  const updateQueryParams = useUpdateQueryParams();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [SearchPost] = useSearchPostMutation();

  useEffect(() => {
    const startAnimation = () => {
      const interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 2000);
      return () => clearInterval(interval);
    };

    startAnimation();
  }, [placeholders.length]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  const [animating, setAnimating] = useState<boolean>(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    const actualData = { keyword: value };
    updateQueryParams({ search: value }, "/collections");
    SearchPost({ actualData });
  };

  return (
    <span className="relative w-full lg:min-w-[500px]">
      <form
        className={cn(
          "w-full cursor-pointer relative md:max-w-xl md:mx-auto flex bg-default-400/20 dark:bg-default-500/20 h-[40px] rounded-lg overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
          "dark:bg-zinc-800/50 bg-muted/50",
          "ring-offset-background border-transparent md:border-none outline-none ring-2 md:ring-0 ring-[#7828c8]/50 ring-offset-2 md:ring-offset-0 items-center"
        )}
        onSubmit={handleSubmit}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none  text-base transform scale-50 top-[15%] left-2  origin-top-left filter invert dark:invert-0 pr-10 md:left-7",
            !animating ? "opacity-0" : "opacity-100"
          )}
          ref={canvasRef}
        />
        <label className="sr-only">Search</label>
        <div className="pointer-events-none absolute inset-y-0 start-0 items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50 hidden md:flex -left-1">
          {/* {searchLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            )} */}
            <Search size={20} strokeWidth={2} aria-hidden="true" />
        </div>
        <input
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 px-4 py-4 left-0 md:left-5 ",
            animating && "text-transparent dark:text-transparent"
          )}
        />
        <Kbd
          keys={["command"]}
          className="!rounded-md w-8 h-8 absolute right-1 top-[4px] shadow-lg bg-neutral-950 text-white text-xl flex items-center justify-center p-0"
          container="relative -right-[1px]"
        />
        <Button
          variant="active"
          className="mr-[2px] flex md:hidden shadow-none"
        >
          Search
        </Button>
        <div className="absolute inset-0 flex items-center rounded-full pointer-events-none left-0 md:left-5">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.p
                initial={{
                  y: 5,
                  opacity: 0,
                }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -15,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
                {...{
                  className:
                    "dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 text-left w-[calc(100%-2rem)] truncate px-4 py-4 ",
                }}
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
      <Component/>
    </span>
  );
}
