import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type KbdKey =
  | "command"
  | "shift"
  | "ctrl"
  | "option"
  | "enter"
  | "delete"
  | "escape"
  | "tab"
  | "capslock"
  | "up"
  | "right"
  | "down"
  | "left"
  | "pageup"
  | "pagedown"
  | "home"
  | "end"
  | "help"
  | "space";

interface Kbd {
    keys: KbdKey[]; 
    className: string;
    children?: ReactNode
}

const Kbd = ({keys, className, children}: Kbd) => {
  const keyAbbr = keys.map(key => {
    switch (key) {
      case "command": return "⌘";
      case "shift": return "⇧";
      case "ctrl": return "⌃";
      case "option": return "⌥";
      case "enter": return "⏎";
      case "delete": return "⌫";
      case "escape": return "⎋";
      case "tab": return "⇥";
      case "capslock": return "⇪";
      case "up": return "↑";
      case "right": return "→";
      case "down": return "↓";
      case "left": return "←";
      case "pageup": return "⇞";
      case "pagedown": return "⇟";
      case "home": return "🏠";
      case "end": return "⏏";
      case "help": return "?";
      case "space": return "␣";
      default: return null;
    }
  }).filter(Boolean);

  return (
    <div>
      <kbd className={cn(`px-1.5 py-0.5 inline-flex space-x-0.5 rtl:space-x-reverse items-center font-sans font-normal text-center text-small shadow-small bg-default-100 text-foreground-600 rounded-small cursor-pointer`,  className)}>
        {keyAbbr.map((abbr, index) => (
          <abbr key={index} className="no-underline" title={keys[index]}>
            {abbr}
          </abbr>
        ))}
        <span>{children}</span>
      </kbd>
    </div>
  );
};

export default Kbd;