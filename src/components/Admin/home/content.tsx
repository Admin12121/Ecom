"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardTransactions } from "./card-transactions";
import { createSwapy } from "swapy";
import  UiChart  from "../charts/barchart";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  { ssr: false }
);

const defaultPositions = {
  "1": "card1",
  "2": "card2",
  "3": "card3",
};

interface SwapEventData {
  from: { slot: string };
  to: { slot: string };
}

export const Content = () => {
  const [positions, setPositions] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      const savedPositions = localStorage.getItem("slotItem");
      return savedPositions ? JSON.parse(savedPositions) : defaultPositions;
    }
    return defaultPositions;
  });

  useEffect(() => {
    const container = document.querySelector(".swapy-container");

    const disableTextSelection = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("selectstart", disableTextSelection);

    if (container) {
      const swapy = createSwapy(container);

      swapy.onSwap((event:any) => {
        const data = event.data as SwapEventData;

        if (data?.from?.slot && data?.to?.slot) {
          const newPositions = { ...positions };
          const { from: { slot: fromSlot }, to: { slot: toSlot } } = data;
          [newPositions[fromSlot], newPositions[toSlot]] = [newPositions[toSlot], newPositions[fromSlot]];
          setPositions((prevPositions) => {
            const updatedPositions = { ...newPositions };
            localStorage.setItem("slotItem", JSON.stringify(updatedPositions));
            return updatedPositions;
          });
        } else {
          console.error("Swap event data is missing slot properties:", data);
        }
      });
    }
    return () => {
      document.removeEventListener("selectstart", disableTextSelection);
    };
  }, [positions]);

  const getCardComponent = (cardId: string) => {
    switch (cardId) {
      case "card1": return <CardBalance1 />;
      case "card2": return <CardBalance2 />;
      case "card3": return <CardBalance3 />;
      default: return null;
    }
  };

  return (
    <div className="p-5 h-[90vh] scroll">
      <div className="flex justify-center gap-4 xl:gap-6 flex-wrap xl:flex-nowrap max-w-[90rem] mx-auto w-full flex-col">
        <div className="gap-5 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <div className="grid md:grid-cols-3 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full swapy-container">
              {Object.entries(positions).map(([slotId, cardId]) => (
                <div className="slot" data-swapy-slot={slotId} key={slotId}>
                  <div className="item" data-swapy-item={cardId}>
                    <div className="handle" data-swapy-handle>
                      {getCardComponent(cardId)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full pb-3">
            <div className="col-span-2 bg-default-50 shadow-lg rounded-3xl p-5 h-[390px]">
              {/* <UiChart /> */}
              <Chart />
            </div>
            <CardTransactions />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
        <TableWrapper />
      </div>
    </div>
  );
};
