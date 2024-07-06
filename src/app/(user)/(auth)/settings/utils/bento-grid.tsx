import { cn } from "./cn";
import {Button} from "@nextui-org/react";
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 bg-[linear-gradient(110deg,#333_0.6%,#222)]  max-h-[20rem] min-h-[300px] h-full w-full border-[#eaeaea] dark:border-neutral-600",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 h-[25%] p-1">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 m-0">
          <h1>{title}</h1>
        </div>
        <div className="font-sans flex items-center justify-between font-normal text-neutral-600 text-xs dark:text-neutral-300">
          <p>{description}</p>
          <Button size="md">Edit</Button>
        </div>
      </div>
    </div>
  );
};
