import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const Addresh = () => {
  return (
    <>
      <Card className="py-4 min-w-[100%] h-[100%] bg-transparent border-none shadow-none">
        <CardHeader className="pb-0  flex-col items-start gap-2">
          <p className="text-tiny uppercase font-bold text-default-500">
            Default Billing Address
          </p>
          <small className="text-default-500">Vicky Tajpuriya</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <h4 className="font-bold text-large">pancha kumari marga</h4>
          <p className="text-default-500 text-sm">
            Bagmati Province - Kathmandu Metro 10 - New Baneshwor Area - Ratna
            Rajya Area (+977) 9816582949
          </p>
        </CardBody>
      </Card>
    </>
  );
};

export default Addresh;
