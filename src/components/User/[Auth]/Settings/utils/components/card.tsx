import React from "react";
import {Card, CardBody, Image, Divider,Button, Slider} from "@nextui-org/react";

export default function ProfileCard() {

  return (
    <Card
      isBlurred
      className="border-none bg-background/60  max-w-[610px]"
      style={{backgroundColor: "hsl(0deg 0% 0% / 50%)"}}
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover rounded-[40px] border-4"
              height={200}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <span className="flex flex-col text-5xl">
                <span className="mb-4 font-bold">
                    <h1>Vicky</h1>
                    <h1>Tajpuriya</h1>
                </span>
                <p className="text-sm font-extralight">@vickytajpuriya . may 8</p>
                <Divider className="mb-4 mt-2" />
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
