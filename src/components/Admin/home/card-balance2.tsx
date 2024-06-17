import { Card, CardBody,Avatar } from "@nextui-org/react";
import React from "react";
import { SalesIcon } from "../icons/sales-icon";
import { ProductIcon } from "../icons/products-icon";

export const CardBalance2 = () => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-3xl shadow-md px-3 w-full h-[250px] ">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <SalesIcon />
          <div className="flex flex-col justify-center">
            <span className="text-default-900 text-3xl">Orders</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-500 text-3xl font-semibold">438</span>
          <span className="text-success text-sm">+ 1.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="text-xs">10 Order pending</span>
              <span className="font-semibold text-danger text-xs">
                {"↓"} 1% than as usual
              </span>
            </div>
          </div>
        </div>
        <div className="pt-2 flex w-full items-center gap-3">
          <ProductIcon />
          <span>25 Total Products</span>
        </div>
        <span className="pt-1 flex items-center gap-2">
          <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <span>
            <p className="text-default-500">best product of all time</p>
            <p className="text-default-500">mac m2</p>
          </span>
        </span>
      </CardBody>
    </Card>
  );
};
