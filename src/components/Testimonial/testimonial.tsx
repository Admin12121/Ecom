import React from "react";
import { InfiniteMovingCards } from "./cards";

interface direction {
    direction?: any;
}

export const InfiniteMovingCardsDemo:React.FC<direction> = ({direction}) => {
  return (
      <InfiniteMovingCards
        items={testimonials}
        direction={direction}
        speed="slow"
      />
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    user:"https://i.pinimg.com/736x/38/c3/1a/38c31a6305ea7ae4dacf5016676df36a.jpg"
  },
  {
    quote:
    "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    user:"https://i.pinimg.com/736x/e3/af/19/e3af19afbfd54aea9d261e59e5fe4808.jpg"
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    user:"https://i.pinimg.com/736x/1f/f2/c9/1ff2c9f0f0d649e581ff84c5af1c3b6f.jpg"
  },
  {
    quote:
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    user:"https://i.pinimg.com/564x/d6/8d/ba/d68dbaf906b45382ca82d9ecd184c0e1.jpg"
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    user:"https://i.pinimg.com/736x/ce/4b/ee/ce4beeb67cb60d0e9057fe7ddaddf444.jpg"
  },
];
