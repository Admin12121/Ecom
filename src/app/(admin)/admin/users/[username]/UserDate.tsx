import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  Accordion,
  AccordionItem,
  Badge,
} from "@nextui-org/react";

interface Device {
  id: number;
  device_type: string;
  device_os: string;
  last_login: string;
  ip_address: string;
  signature: string;
  user: number;
}

// Define the SiteViewLog interface
interface SiteViewLog {
  id: number;
  ip_address: string;
  user_agent: string;
  country: string;
  city: string;
  region: string;
  timestamp: string;
  encsh: string;
  enclg: string;
  user: number;
}

interface User {
  id: number;
  password: string;
  email: string;
  profile: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  dob: string | null;
  gender: string | null;
  social: string;
  is_otp_verified: boolean;
  tc: boolean;
  is_blocked: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
  otp_device: string | null;
  // delivery_address: any[];
  // search_history: any[];
  // devices: Device[];
  // site_view_logs: SiteViewLog[];
}

interface Data {
  id: number;
  password: string;
  email: string;
  profile: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  dob: string | null;
  gender: string | null;
  social: string;
  is_otp_verified: boolean;
  tc: boolean;
  is_blocked: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
  otp_device: string | null;
  delivery_address: any[];
  search_history: any[];
  devices: Device[];
  site_view_logs: SiteViewLog[];
}

const UserDate = ({ data }: { data: Data }) => {
  const [user, setUser] = useState<User>();
  const [device, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    if (data) {
      setUser(data);
      if (data.devices) {
        setDevices(data.devices);
      }
    }
  }, [data]);
  return (
    <>
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["1"]}
        variant="splitted"
      >
        <AccordionItem
          key="1"
          aria-label="Personal details"
          title="Personal details"
          className="!bg-transparent"
        >
          <span className="flex gap-5 items-center w-full">
            <Card
              isBlurred
              className="border-none bg-background/60 w-[400px] max-h-[200px]"
              //   style={{ background: "#121212" }}
            >
              <CardBody>
                <div className="flex w-full items-center justify-between gap-5 ">
                  <span className="flex items-center  gap-10 ">
                    <Badge
                      placement="bottom-right"
                      content=""
                      color={
                        user?.is_active
                          ? user.is_blocked
                            ? "danger"
                            : "success"
                          : "warning"
                      }
                    >
                      <div className="relative">
                        <Image
                          isBlurred
                          alt={user?.username}
                          className="object-cover rounded-[40px] max-h-[150px] border-0 shadow-none"
                          height={150}
                          width={150}
                          src={
                            user?.profile
                              ? user.profile
                              : "https://i.pinimg.com/564x/53/f6/6b/53f66b99aaa95b4f3958856266a96d7e.jpg"
                          }
                        />
                      </div>
                    </Badge>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                      <span className="flex flex-col">
                        <span className="font-bold">
                          <h1>
                            {user?.first_name} {user?.last_name}
                          </h1>
                        </span>
                        <Divider className="mb-2 mt-2" />
                        <p className="text-sm font-extralight">
                          {user?.email} . {user?.created_at.slice(5, 10)}
                        </p>
                      </span>
                    </div>
                  </span>
                </div>
              </CardBody>
            </Card>
            <div className="flex flex-col w-[400px] p-2 gap-1 text-sm font-extralight">
              <p>Phone : {user?.phone ? user?.phone : "-"}</p>
              <p>Date of Birth : {user?.dob ? user?.dob : "-"}</p>
              <p>Gender : {user?.gender ? user?.gender : "-"}</p>
              <p>Social : {user?.social ? user?.social : "-"}</p>
              <p>
                Last Login :{" "}
                {user?.last_login ? user?.last_login.slice(0, 10) : "-"}
              </p>
            </div>
          </span>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Devices"
          title="Devices"
          className="!bg-transparent"
        >
          <span className="flex gap-5">
            {device &&
              device.map((data, index) => (
                <>
                  <Card className="min-w-[300px]" key={index}>
                    <CardHeader className="flex gap-3">
                      <h1>{data.device_type}</h1>
                    </CardHeader>
                    <CardBody>
                      <span className="text-sm font-extralight">
                        <h1>Devices OS : {data.device_os}</h1>
                        <h1>Last Login: {data.last_login.slice(0, 10)}</h1>
                        <h1>Ip: {data.ip_address}</h1>
                        <h1>Signature: {data.signature}</h1>
                      </span>
                    </CardBody>
                  </Card>
                </>
              ))}
          </span>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="User Activity"
          title="User Activity"
          className="!bg-transparent "
        ></AccordionItem>
      </Accordion>
    </>
  );
};

export default UserDate;
