import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
  className?: string;
}

export const BackButton = ({ label, href, className }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={`${className} mt-4 text-themeTextGray text-xs text-[rgb(39 39 42 / 1)] hover:text-themeTextWhite transition duration-500`}
    >
      {label}
    </Link>
  );
};
