import { tv } from "@nextui-org/react";

export const SidebarWrapper = tv({
  base: "bg-background border-none transition-transform h-full fixed -translate-x-full w-72 max-2xl:w-[100px] shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-3 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 scroll",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 [display:inherit]",
    },
  },
});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

export const Header = tv({
  base: "flex gap-8 items-center px-6 max-2xl:p-0 max-2xl:items-center max-2xl:justify-center",
});

export const Body = tv({
  base: "flex flex-col gap-6 mt-7 px-2 max-2xl:gap-3",
});

export const Footer = tv({
  base: "flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
