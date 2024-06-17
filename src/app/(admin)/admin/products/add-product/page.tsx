"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody} from "@nextui-org/card";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Select, SelectItem } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
const AddProduct = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const router = useRouter();
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <>
      <div className="flex flex-col gap-5 px-5 pb-5 h-[90vh] scroll">
        <span className="flex items-center justify-between">
          <Breadcrumbs>
            <BreadcrumbItem onClick={() => router.push("admin/products")}>
              Products
            </BreadcrumbItem>
            <BreadcrumbItem>Add Products</BreadcrumbItem>
          </Breadcrumbs>
          <Button color="secondary">Save Product</Button>
        </span>
        <span className="flex w-full gap-5 max-xxl:flex-col">
          <Card className="w-[70%] max-xxl:w-full">
            <CardHeader>
              <h1>General information</h1>
            </CardHeader>
            <CardBody className="flex gap-5 w-full">
              <Input
                type="text"
                label="New Product"
                placeholder="buddha statue"
                labelPlacement="outside"
                size="lg"
                radius="sm"
              />
              <Textarea
                label="Description"
                labelPlacement="outside"
                minRows={8}
                placeholder="Enter your description"
              />
              <span className="">
                <h1>Size </h1>
                <span className="flex gap-3">
                  <Button></Button>
                  <Button></Button>
                  <Button></Button>
                </span>
              </span>
            </CardBody>
          </Card>
          <Card className="w-[30%] min-w-[350px] max-xxl:w-full">
            <CardBody>
              <h1>Upload Image</h1>
            </CardBody>
          </Card>
        </span>
        <span className="flex w-full gap-5 max-xxl:flex-col pb-5">
          <Card className="w-[70%] max-xxl:w-full">
            <CardHeader>
              <h1>Pricing And Stock</h1>
            </CardHeader>
            <CardBody className="flex gap-5 w-full max-xxl:w-full">
              <span className="flex gap-5">
                <Input
                  type="text"
                  label="Base Pricing"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                />
                <Input
                  type="text"
                  label="Stock"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                />
              </span>
              <span className="flex gap-5">
                <Input
                  type="text"
                  label="Discount"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                />
                <Input
                  type="text"
                  label="New Product"
                  placeholder="buddha statue"
                  labelPlacement="outside"
                  size="lg"
                  radius="sm"
                />
              </span>
            </CardBody>
          </Card>
          <Card className="w-[30%] min-w-[350px] max-xxl:w-full">
            <CardHeader>
              <h1>Cateory</h1>
            </CardHeader>
            <CardBody className="flex gap-5 items-start">
              <Select
                labelPlacement="outside"
                label="Product Category"
                placeholder="Select an Category"
                className="max-w-xs"
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <Button color="secondary">Add Category</Button>
            </CardBody>
          </Card>
        </span>
      </div>
    </>
  );
};

export const animals = [
  { key: "brass", label: "Brass" },
  { key: "silver", label: "Silver" },
  { key: "halfgold", label: "Half Gold" },
  { key: "fullgold", label: "Full gold" },
];

export default AddProduct;
