import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  AvatarIcon,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";

export const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            radius="sm"
            as="button"
            color="secondary"
            size="md"
            icon={<AvatarIcon/>}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "text-black/80",
            }}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>admin@gmail.com</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
