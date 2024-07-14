import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
  Badge,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { NotificationIcon } from "../icons/navbar/notificationicon";
import { toast } from "sonner";
import { getToken } from "@/lib/store/Service/LocalStorageServices";

export const NotificationsDropdown = () => {
  const [messages, setMessages] = useState<string[]>([]); // Explicitly type the state
  const { access_token } = getToken();
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${access_token}`
    );
    socket.onopen = () => {
      // console.log('WebSocket connection opened');
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const notification = JSON.parse(data.message);
      // console.log("actualdata",event.data, "converted data",data,"finaldata" ,notification)
      toast.success(notification.title);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };
    socket.onclose = () => {
      // console.log('WebSocket connection closed');
    };
    socket.onerror = (error) => {
      // toast.success("Error on Notification");
      // console.error('WebSocket error:', error);
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem className="cursor-pointer flex items-center">
          <Badge
            content=""
            color="secondary"
            shape="circle"
            placement="top-right"
          >
            <NotificationIcon />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-60" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="User Ordered Itme 22. On 2024-6-4 at 16:15:12"
          >
            🟠 Order
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="User 12 Registration Successful."
          >
            🟣 User Added
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="User add Review for A3 Product."
          >
            ⚪ Review
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="user@gmail.com message you."
          >
            ⚫ Contact
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
