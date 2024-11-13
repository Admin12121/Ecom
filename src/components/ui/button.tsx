"use client"
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Spinner from "./spinner";
import { cn } from "@/lib/utils";

const animationVariants = {
  neutral: "bg-neutral-100 dark:bg-neutral-600",
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        active:"text-white bg-main shadow-lg shadow-main/40 hover:opacity-90",
        custom:"bg-main dark:bg-custom/40 text-white dark:text-secondary-foreground shadow-lg shadow-main/40 dark:shadow-main/0 hover:opacity-90",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  endContent?: React.ReactNode;
  animationVariant?: keyof typeof animationVariants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loading,
      icon,
      endContent,
      animationVariant = "neutral",
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const x = e.clientX - button.getBoundingClientRect().left;
      const y = e.clientY - button.getBoundingClientRect().top;
      const ripples = document.createElement("span");
      ripples.style.cssText = `
        left: ${x}px; 
        top: ${y}px; 
        position: absolute; 
        transform: translate(-50%, -50%); 
        pointer-events: none; 
        border-radius: 50%; 
        animation: ripple 1.4s linear infinite; 
        transition: 0.5s;`;
      ripples.className = "ripple";
      ripples.classList.add(...animationVariants[animationVariant].split(" "));
      button.appendChild(ripples);
      setTimeout(() => {
        ripples.remove();
      }, 1400);
      if (onClick) {
        onClick(e);
      }
    };    
    return (
      <Comp
        className={cn("overflow-hidden relative",buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {loading ? <Spinner color="secondary" size="sm"/> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export const styles = `
  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }
    100% {
      width: 520px;
      height: 520px;
      opacity: 0;
    }
  }
  .ripple {
    background: rgba(255, 255, 255, 0.7); // Example ripple color, adjust as needed
    width: 20px;
    height: 20px;
  }
`;


export { Button, buttonVariants };
