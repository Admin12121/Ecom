"use client";
import React, {
  useState,
  useDeferredValue,
  Suspense,
  useEffect,
  useMemo,
} from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Kbd from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Table, SquareMenu } from "lucide-react";

import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner";

type ViewProps = {
  deferredSearch: string;
};

export default function SalesManagementKanban() {
  const [tab, setTab] = useState<"kanban" | "tablist" | null>(null);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const saved = localStorage.getItem("viewTab") as "kanban" | "tablist";
    setTab(saved || "kanban");
  }, []);

  const handleSetTab = (val: "kanban" | "tablist") => {
    if (val !== tab) {
      localStorage.setItem("viewTab", val);
      setTab(val);
    }
  };

  const Component = useMemo(() => {
    if (!tab) return null;
    return dynamic<ViewProps>(() => import(`./${tab}`), { ssr: false });
  }, [tab]);

  return (
    <main className="w-full h-full min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <span className="flex items-start justify-between gap-2 flex-col md:flex-row">
        <h1 className="text-2xl">Sales</h1>
        <div className="flex items-center gap-2">
          <div
            className={`relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg`}
          >
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className=" dark:bg-neutral-800 pl-8 border-0 focus:outline-none focus-visible:ring-0"
            />
            <Kbd
              keys={["command"]}
              className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
            ></Kbd>
          </div>
          <div className="divide-primary-foreground/30 inline-flex divide-x rounded-md shadow-xs rtl:space-x-reverse">
            <Button
              variant={tab === "tablist" ? "default" : "outline"}
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              size="icon"
              aria-label="Table view"
              onClick={() => handleSetTab("tablist")}
            >
              <SquareMenu size={16} aria-hidden="true" />
            </Button>
            <Button
              size="icon"
              variant={tab === "kanban" ? "default" : "outline"}
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              aria-label="Kanban View"
              onClick={() => handleSetTab("kanban")}
            >
              <Table size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </span>
      {Component ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Spinner />
            </div>
          }
        >
          <Component deferredSearch={deferredSearch} />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner />
        </div>
      )}
    </main>
  );
}
