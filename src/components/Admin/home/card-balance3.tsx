import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import RevinueIcon from "../icons/revinue-Icon";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-neutral-950 rounded-3xl shadow-md px-3 w-full h-[250px]">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <RevinueIcon />
          <div className="flex flex-col justify-center">
            <span className="text-white text-3xl">Revenue </span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-500 text-2xl font-semibold">
            $3,910.00
          </span>
          <span className="text-success text-xs">+ 4.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="text-xs flex text-default-500">
                Increased by
                <p className="font-semibold text-success text-xs mx-1"> +5.7% </p> this month
              </span>
              <span className="text-xs"> </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
