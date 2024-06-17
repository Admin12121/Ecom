"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => (
  <div className="p-5 h-[90vh] scroll">
    <div className="flex justify-center gap-4 xl:gap-6  flex-wrap xl:flex-nowrap  max-w-[90rem] mx-auto w-full flex-col">
      <div className="gap-5 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <div className="grid md:grid-cols-3 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>

        {/* Chart */}
        <div className="grid md:grid-cols-3 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full pb-3">
          <div className="col-span-2 bg-default-50 shadow-lg rounded-3xl p-5 h-[390px]">
            {/* <h3 className="text-xl font-semibold">Statistics</h3> */}
            <Chart />
          </div>
          <CardTransactions />
        </div>
      </div>

      {/* Left Section */}
      {/* <div className=" gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold">Section</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
          <CardTransactions />
        </div>
      </div> */}
    </div>

    {/* Table Latest Users */}
      {/* <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">Latest Users</h3>
        <Link
          href="/accounts"
          as={NextLink}
          color="primary"
          className="cursor-pointer"
        >
          View All
        </Link>
      </div> */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <TableWrapper />
    </div>
  </div>
);
