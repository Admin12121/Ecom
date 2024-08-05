"use client";
import Productcard from "@/components/Admin/products/card";
import React, { useEffect, useState , useMemo } from "react";
import { Button } from "@nextui-org/react";
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { FormData } from "@/types/product";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Icon from "@/components/Admin/icons/Icon"
import { useRouter } from "next/navigation";
import Add_icon from "@/components/Admin/icons/add-icon";


const Product = () => {
  const router = useRouter();
  const {data, isLoading, refetch} = useProductsViewQuery({})
  const [products, SetProducts] = useState<FormData[]>([])

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["recent"])
  );

  useEffect(()=>{
    SetProducts(data?.results)
  },[data])

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      <div className="pt-0 px-5 flex flex-col gap-5 h-[90vh] scroll">
        <span className="w-full flex justify-between gap-5 items-center">
          <span>
            <Breadcrumbs>
              <BreadcrumbItem>Products</BreadcrumbItem>
            </Breadcrumbs>
          </span>

          <span className="flex items-center justify-center gap-5">
            <Dropdown>
                <DropdownTrigger className="w-[200px] justify-start items-center">
                  <Button
                    variant="bordered"
                    className="capitalize justify-between"
                    endContent={<Icon />}
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) =>
                    setSelectedKeys(keys as Set<string>)
                  }
                >
                  <DropdownItem key="recent">Recent</DropdownItem>
                  <DropdownItem key="oldest">Oldest</DropdownItem>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="rating">Rating</DropdownItem>
                  <DropdownItem key="trending">Trending</DropdownItem>
                  <DropdownItem key="selled">Most Selled</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                color="secondary"
                onPress={() => router.push("/admin/products/add-product")}
              >
                <Add_icon />
                Add Product
              </Button>
          </span>
        </span>
        <span className=" flex flex-wrap gap-3 justify-center py-5 ">
          {products && products.map((products, index:any) => {
            return (
              <Productcard
                key={index}
                products={products}
                clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}
              />
            );
          })}
        </span>
      </div>
    </>
  );
};

export default Product;
