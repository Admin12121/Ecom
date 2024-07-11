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
import CategoryIcon from "./CategoryIcon";
import FilterIcon from "./FilterIcon";

interface ContentProps {
  id?: string;
  params? :string;
}

const Header: React.FC<ContentProps> = ({ id ,params}) => {
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
            ) : (
              params ? <span>Search Result {params && `for  "${params}"`}</span> : <span>collections</span>
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
            <Dropdown>
              <DropdownTrigger className="w-[200px] justify-start items-center">
                <Button
                  variant="bordered"
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
                onSelectionChange={(keys) =>
                  setSelectedKeys(keys as Set<string>)
                }
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
          <NavbarItem className="flex gap-2">
            <ButtonGroup>
              <Button isIconOnly onPress={() => SetFilter(!filter)}>
                <CategoryIcon SetFilter={SetFilter} filter={filter} />
              </Button>
              <Button isIconOnly onPress={() => SetFilter(!filter)}>
                <FilterIcon SetFilter={SetFilter} filter={filter} />
              </Button>
            </ButtonGroup>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Header;
