"use client";

import {
  ArrowDown as RiArrowDownLine,
  ArrowUp as RiArrowUpLine,
  Space as RiCornerDownLeftLine,
} from "lucide-react";
import * as React from "react";
import { useTrendingProductsViewQuery } from "@/lib/store/Service/api";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { CommandCard } from "./command-card";
import { useRouter } from "nextjs-toploader/app";
import suggestion from "./suggestions.json";
import Fuse from "fuse.js";

const fuseOptions = {
  includeScore: true,
  threshold: 0.1,
  keys: ["text"],
};

const fuse = new Fuse(suggestion, fuseOptions);

type Route = { title: string; link?: string; action?: () => void };

const routeMap: Route[] = [
  { title: "Settings", link: "/settings" },
  { title: "Cart", link: "/cart" },
  { title: "Dashboard", link: "/dashboard" },
  { title: "Profile", link: "/profile" },
  { title: "Order History", link: "/orders" },
  { title: "Wishlist", link: "/wishlist" },
];

const actions = [
  { title: "Logout", action: () => alert("Logged out!") },
  { title: "Change Theme", action: () => alert("Theme changed!") },
];

const allCommands = [...routeMap, ...actions];
const getRandomItems = (array: string[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const titles = routeMap.map((route) => route.title.toLowerCase());

export default function Component() {
  const route = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [matchedCommand, setMatchedCommand] = React.useState<Route | null>(
    null
  );
  const [tag, setTag] = React.useState<string[]>(getRandomItems(titles, 4));
  const { data, isLoading } = useTrendingProductsViewQuery({ skip: !open });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" || (e.key === "K" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleRoute = ({ productslug }: { productslug: string }) => {
    setOpen(false);
    route.push(`/collections/${productslug}`);
  };

  const [suggestion, setSuggestion] = React.useState("");

  const handleInputChange = (value: string) => {
    setSearch(value);

    if (value.trim()) {
      const results = fuse.search(value);
      if (results.length > 0) {
        setTag(results.slice(0, 5).map((result) => result.item.text));
        const bestMatch = results[0].item.text;
        setSuggestion(bestMatch);
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }

    const normalizedInput = value
      .toLowerCase()
      .replace(/^(open|go to|view|search for)/, "")
      .trim();

    const match = allCommands.find((command) =>
      command.title.toLowerCase().includes(normalizedInput)
    );

    setMatchedCommand(match || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Tab" || e.key === "Enter") && suggestion) {
      e.preventDefault();
      setSearch(suggestion);
      setSuggestion("");
    }
    if (e.key === "Enter" && matchedCommand) {
      e.preventDefault();
      setSearch("");
      setOpen(false);
      if ("link" in matchedCommand && matchedCommand.link) {
        route.push(matchedCommand.link);
      } else if ("action" in matchedCommand && matchedCommand.action) {
        matchedCommand.action();
      }
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="max-h-[600px] max-w-[600px] w-[600px] rounded-2xl !ring-0 border-0 focus:outline-none focus:ring-0"
    >
      <CommandInput
        value={search}
        onValueChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a command or search..."
      />
      {suggestion && (
        <span className="absolute top-[.35rem] left-6 px-4 py-2 text-gray-400/50 select-none pointer-events-none text-sm">
          {search}
          <span className="text-gray-400">
            {suggestion.substring(search.length)}
          </span>
        </span>
      )}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Searching For">
          <div className="flex flex-wrap gap-2 mb-2 px-3">
            {tag.map((text, index) => (
              <span key={index} onClick={() => setSearch(text)}>
                <CommandItem className="!p-0 m-0">
                  <Tag>{text}</Tag>
                </CommandItem>
              </span>
            ))}
          </div>
        </CommandGroup>
        <CommandSeparator />
        {search && (
          <CommandGroup heading="results">
            <div className="flex gap-2">
              {data?.map((product: any, index: any) => (
                <CommandItem key={index} className="!p-0 !m-0 w-auto">
                  <CommandCard data={product} handleRoute={handleRoute} />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        )}
        {!search && (
          <CommandGroup heading="Recently viewed">
            <div className="flex gap-2">
              {data?.map((product: any, index: any) => (
                <CommandItem key={index} className="!p-0 !m-0 w-auto">
                  <CommandCard data={product} handleRoute={handleRoute} />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        )}
        <CommandSeparator />
        {!search && (
          <CommandGroup heading="Smart Prompt Suggestions">
            {routeMap.slice(3, 6).map((router, index) => (
              <div
                key={index}
                onClick={() => {
                  if (router?.link) {
                    route.push(router.link);
                  }
                }}
              >
                <CommandItem>
                  <Spark />
                  <span className="ml-2 font-normal">Go to {router.title}</span>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>
        )}
        {search && (
          <CommandGroup heading="Smart Prompt Suggestions">
            {routeMap.map((router, index) => (
              <div
                key={index}
                onClick={() => {
                  if (router?.link) {
                    route.push(router.link);
                  }
                }}
              >
                <CommandItem>
                  <Spark />
                  <span className="ml-2 font-normal">{router.title}</span>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>
        )}
        <footer className="flex justify-between items-center px-4  bottom-0 w-full z-50 backdrop-blur-lg rounded-b-2xl border-t">
          <div className="flex gap-3 font-normal text-sm">
            <div className="flex items-center gap-2">
              <CommandShortcut>
                <RiArrowUpLine className="size-3" />
              </CommandShortcut>
              <CommandShortcut>
                <RiArrowDownLine className="size-3" />
              </CommandShortcut>
              <span className="text-xs ">Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <CommandShortcut className="w-5">
                <RiCornerDownLeftLine className="size-3" />
              </CommandShortcut>
              <span className="text-xs">Select</span>
            </div>
          </div>
          <div className="text-xs font-normal text-right">
            Not what you’re looking for? Try the{" "}
            <Button
              variant="link"
              className="text-xs px-0 font-normal text-purple-600 underline"
            >
              Help Center
            </Button>
          </div>
        </footer>
      </CommandList>
    </CommandDialog>
  );
}

const Spark = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="remixicon size-5 shrink-0 text-neutral-500 dark:text-neutral-200"
    >
      <path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM4.87601 12C6.18717 12.7276 7.27243 13.8128 8 15.124 8.72757 13.8128 9.81283 12.7276 11.124 12 9.81283 11.2724 8.72757 10.1872 8 8.87601 7.27243 10.1872 6.18717 11.2724 4.87601 12ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"></path>
    </svg>
  );
};
