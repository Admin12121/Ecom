import Link from "next/link";
interface BackButtonProps {
  label: string;
  href: string;
  className?: string;
}

export const BackButton = ({ label, href, className }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={`${className} ml-1 text-purple-500 text-xs text-[rgb(39 39 42 / 1)] hover:text-violet-500 transition duration-500`}
    >
      {label}
    </Link>
  );
};
