import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import {Avatar, AvatarGroup} from "@nextui-org/avatar";

export const CardBalance1 = () => {
  return (
    <Card className="xl:max-w-sm bg-neutral-950 rounded-3xl shadow-md px-3 w-full h-[250px]">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col items-center justify-center">
            <span className="text-white text-2xl">Total Users</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-500 text-3xl font-semibold">45,910</span>
          <span className="text-success text-sm">+ 4.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="text-xs text-default-500">+ 100  New Accounts Created</span>
            </div>
            <span className="text-default-500 text-xs">+400 total views today</span>
              <span className="font-semibold text-success text-xs">{"↑"}</span>
              <span className="font-semibold text-success text-xs">2.5%</span>
              <span className="font-semibold text-success text-xs"> than as usual</span>
          </div>
        </div>
          <div className="w-full flex pt-5">
            <AvatarGroup max={5} total={10}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </div>
      </CardBody>
    </Card>
  );
};
