"use client";
import Productcard from "@/components/Admin/products/card";
import React from "react";
import { Button } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
interface Event {
  id: number;
  img: string;
}

const data: Event[] = [
  {
    id: 1,
    img: "/product1.png",
  },
  {
    id: 2,
    img: "/product.png",
  },
  {
    id: 3,
    img: "/product2.png",
  },
  {
    id: 4,
    img: "/product.png",
  },
  {
    id: 5,
    img: "/product1.png",
  },
  {
    id: 6,
    img: "/product2.png",
  },
  {
    id: 7,
    img: "/product1.png",
  },
  {
    id: 8,
    img: "/product.png",
  },
];
import { useRouter } from "next/navigation";
import Add_icon from "@/components/Admin/icons/add-icon";
const Product = () => {
  const router = useRouter();
  return (
    <>
      <div className="pt-0 px-5 flex flex-col gap-5 h-[90vh] scroll">
        <span className="w-full flex justify-between gap-5 items-center">
          <Breadcrumbs>
            <BreadcrumbItem>Products</BreadcrumbItem>
          </Breadcrumbs>

          <Button
            color="secondary"
            onPress={() => router.push("/admin/products/add-product")}
          >
            <Add_icon />
            Add Product
          </Button>
        </span>
        <span className=" flex flex-wrap gap-3 justify-center pb-5">
          {data.map(({ img, id }: { img: string; id: number }, index) => {
            return (
              <Productcard
                key={index}
                id={id}
                clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}
                image={img}
              />
            );
          })}
        </span>
      </div>
    </>
  );
};

export default Product;
