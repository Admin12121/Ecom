import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const Help = () => {
  return (
    <>
      <div className="w-[100vw] p-10 h-[100vh] flex items-center justify-center flex-col gap-4">
        <h1>Help Services</h1>
        <div className="flex w-full flex-wrap gap-5 justify-center">
          <Card className="py-4 max-h-[250px] max-w-[250px] w-[250px] h-[250px] cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center flex items-center">
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">My Order</h4>
            </CardBody>
          </Card>
          <Card className="py-4 max-h-[250px] max-w-[250px] w-[250px] h-[250px] cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center flex items-center">
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Reset Password</h4>
            </CardBody>
          </Card>
          <Card className="py-4 max-h-[250px] max-w-[250px] w-[250px] h-[250px] cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center flex items-center">
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">My Payment Options</h4>
            </CardBody>
          </Card>
          <Card className="py-4 max-h-[250px] max-w-[250px] w-[250px] h-[250px] cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center flex items-center">
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">My Profile</h4>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Help;
