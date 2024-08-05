import { cn } from "./cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import ProfileCard from "./components/card";
import Addresh from "./components/Addresh";
import PaymentCard from "./components/PaymentCard";
import OrderTable from "./components/OrderTable";


export default function BentoGridSecondDemo() {
  return (
    <BentoGrid className="mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        //   icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({children}:{ children?: React.ReactNode }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl items-center justify-center border border-transparent" >{children}</div>
);
const items = [
  {
    title: "Personal Profile",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton ><ProfileCard/></Skeleton>,
    className: "md:col-span-2",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Addresh Book",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton ><Addresh/></Skeleton>,
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Payment option",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton><PaymentCard/></Skeleton>,
    className: "md:col-span-1",
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Recent Orders",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton ><OrderTable/></Skeleton>,
    className: "md:col-span-2",
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
