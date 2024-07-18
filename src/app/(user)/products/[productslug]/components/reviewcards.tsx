import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

const Reviewcards = () => {
  return (
    <>
      <Card className="bg-transparent border-0 w-[380px] h-[460px] ">
        <CardBody className="flex flex-col gap-4 shadow-none">
          <Image
            isBlurred
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover"
            className="w-[380px] h-[300px] object-cover"
          />
          <Card className="w-[360px] h-[150px] flex flex-col gap-4">
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
      <Card className="bg-transparent border-0 w-[380px] h-[460px] ">
        <CardBody className="flex flex-col gap-4 shadow-none">
          <Card className="w-[360px] h-[150px] flex flex-col gap-4">
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
          <Image
            isBlurred
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover"
            className="w-[380px] h-[300px] object-cover"
          />
        </CardBody>
      </Card>
      <Card className="bg-transparent border-0 w-[380px] h-[460px] ">
        <CardBody className="flex flex-col gap-4 shadow-none">
          <Image
            isBlurred
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover"
            className="w-[380px] h-[300px] object-cover"
          />
          <Card className="w-[360px] h-[150px] flex flex-col gap-4">
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </CardBody>
      </Card>         
    </>
  );
};

export default Reviewcards;
