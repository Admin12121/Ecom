"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { TableWrapper } from "@/components/Admin/table/table";
import { AddUser } from "./add-user";

export const Accounts = () => {
  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 p-3 overflow-y-auto scroll">
      {/* <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Users</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul> */}

      <h3 className="text-xl font-semibold">All Users</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
          <Button color="secondary">
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
  );
};
