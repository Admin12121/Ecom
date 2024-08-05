"use client";
import React, { useState, useMemo } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Icon from "./Icon";
import { IoColorFilter  } from "react-icons/io5";
import { IoIosColorFilter } from "react-icons/io";
import CategoryIcon from "./CategoryIcon";
import FilterIcon from "./FilterIcon";

interface ContentProps {
  id?: string;
  params?: string;
  setFilters? :any;
  filters? : boolean
}

const Header: React.FC<ContentProps> = ({ id, params, setFilters, filters }) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["recent"])
  );
  const [filter, SetFilter] = useState<boolean>(false);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Navbar className="w-full max-w-full">
      <NavbarBrand>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link href="/" className="text-foreground/50">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {id ? (
              <Link href="/collections" className="text-foreground/50">
                All Products
              </Link>
            ) : params ? (
              <span>Search Result {params && `for  "${params}"`}</span>
            ) : (
              <span>collections</span>
            )}
          </BreadcrumbItem>
          {/* {params && <BreadcrumbItem>{params}</BreadcrumbItem>} */}
          {id && <BreadcrumbItem>{id}</BreadcrumbItem>}
        </Breadcrumbs>
      </NavbarBrand>
      {!id && (
        <NavbarContent justify="end" className="max-sm:hidden">
          <NavbarItem className="flex items-center gap-4">
            {/* <p>Short by : </p> */}
            <Dropdown
              radius="md"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "min-w-[150px] border-0 border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
              }}>
              <DropdownTrigger className="w-[150px] justify-start items-center">
                <Button
                  variant="flat"
                  radius="sm"
                  size="sm"
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
                className="p-0"
                onSelectionChange={(keys) =>
                  setSelectedKeys(keys as Set<string>)
                }
                itemClasses={{
                  base: [
                    "w-[150px]",
                  ],
                }}                
              >
                <DropdownItem key="recent">Recent</DropdownItem>
                <DropdownItem key="oldest">Oldest</DropdownItem>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="rating">Rating</DropdownItem>
                <DropdownItem key="trending">Trending</DropdownItem>
                <DropdownItem key="selled">Most Selled</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <Button
            variant="flat"
            radius="sm"
            size="sm"
            className="capitalize justify-between"
            onClick={()=>setFilters(!filters)}
            endContent={<IoIosColorFilter  size={18}/>}
          >
            Show Filters
          </Button>
          {/* <NavbarItem className="flex gap-2">
            <ButtonGroup>
              <Button isIconOnly onPress={() => SetFilter(!filter)}>
                <CategoryIcon SetFilter={SetFilter} filter={filter} />
              </Button>
              <Button isIconOnly onPress={() => SetFilter(!filter)}>
                <FilterIcon SetFilter={SetFilter} filter={filter} />
              </Button>
            </ButtonGroup>
          </NavbarItem> */}
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Header;
