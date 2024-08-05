import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { FeedbackIcon } from "../../icons/navbar/feedback-icon";
import { GithubIcon } from "../../icons/navbar/github-icon";
import { SupportIcon } from "../../icons/navbar/support-icon";
import useAuth from "@/context/AuthContext";
import { SearchIcon } from "../../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import ToggleButton from "./ToggleButton";
import {Select, SelectItem,  Avatar,} from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { isLoggedIn, handleLogout, liveratedata, handleSelectionChange ,selectedcurrencyiso} = useAuth();  
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden admin-navbar">
      <Navbar
        isBordered
        className="w-full border-none "
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full ",
              mainWrapper: "w-full max-w-[600px]",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
        {liveratedata && <Select
              variant="bordered"            
              items={liveratedata}
              selectedKeys={[selectedcurrencyiso]}
              onChange={handleSelectionChange}
              placeholder="Country / Region"
              className="max-w-xs min-w-[200px]"
              classNames={{
                label: "group-data-[filled=true]:-translate-y-5",
                trigger: "border-none",
                listboxWrapper: "max-h-[400px] ",
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-default-200",
                  content: "p-0 border-small border-divider bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black backdrop-blur-md",
                },
              }}              
              renderValue={(items) => {
                return items.map((item) => (
                  <div className="flex gap-2 items-center" key={item?.data?.iso3}>
                    <Avatar alt={item?.data?.iso3} className="flex-shrink-0" size="sm" name={item?.data?.symbol}/>
                    <div className="flex flex-col text-foreground">
                      <span className="text-base">{item?.data?.name}</span>
                    </div>
                  </div>
                ));
              }}              
            >
              {(liveratedata) => (
                <SelectItem key={liveratedata?.iso3} textValue={liveratedata?.name} className="transparent backdrop-blur-md">
                  <div className="flex gap-2 items-center">
                    <Avatar alt={liveratedata?.iso3} className="flex-shrink-0" size="sm" name={liveratedata.symbol}/>
                    <div className="flex flex-col">
                      <span className="text-base">{liveratedata?.name}</span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>    }                  
          <ToggleButton />
          <NotificationsDropdown />
          {/* <Link
            href="https://github.com/Admin12121/Dashboard"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
