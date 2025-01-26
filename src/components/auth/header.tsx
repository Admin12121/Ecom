import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeaderProps {
  title: string;
  label: string;
  className?: string;
}

export const Header = ({ title, label, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center mb-5",
        className
      )}
    >
      <Image src="/logo.png" width={50} height={50} alt="logo" />
      <h5 className="font-bold text-2xl dark:text-themeTextWhite">{title}</h5>
      <p className="text-neutral-950/80 text-sm dark:text-themeTextGray leading-tight">
        {label}
      </p>
    </div>
  );
};
