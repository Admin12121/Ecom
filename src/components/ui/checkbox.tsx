"use client"

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  checkBox: {
    display: 'block',
    cursor: 'pointer',
    width: '15px',
    height: '15px',
    border: '2px solid rgba(255, 255, 255, 0)',
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 0px 0px 1px #fff',
  },
  transitionDiv: {
    width: '30px',
    height: '30px',
    backgroundColor: '#fff',
    position: 'absolute',
    transform: 'rotateZ(45deg)',
    zIndex: 100,
    transition: '300ms ease',
    opacity: 0, // Initially hidden
    cursor: 'pointer',
  },
  input: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    zIndex: 200,
    margin: 0,
    cursor: 'pointer',
  }
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={className}
      {...props}
      style={styles.checkBox}
      onClick={handleToggle}
    >
      <input type="checkbox" style={styles.input} checked={isChecked} readOnly />
      <div
        style={{
          ...styles.transitionDiv,
          top: isChecked ? '-10px' : '-26px',
          left: isChecked ? '-10px' : '-26px',
          opacity: isChecked ? 1 : 0,
        }}
      />
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "CustomCheckbox";

export { Checkbox };