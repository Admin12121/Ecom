"use client"
import React from "react";
import {
  Card,
  CardBody,
  Image,
  Divider,
  Button,
  Slider,
  Chip,
} from "@nextui-org/react";
import { BsBox } from "react-icons/bs";
import { ReactLenis, useLenis } from "lenis/react";

export default function Profile() {
  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1 }}>
      <section className="flex item-center justify-center w-full h-full">
        <Card
          isBlurred
          className="border-none bg-background/60  rounded-3xl  w-[710px] h-[320px]"
          style={{ backgroundColor: "#18181b" }}
          shadow="sm"
        >
          <CardBody className="p-5">
            <div className=" gap-6 flex flex-row items-center justify-center h-full">
              <div className="flex flex-col col-span-6 min-w-[350px]  h-full justify-center">
                <span className="flex flex-col text-4xl">
                  <span className="mb-4 font-bold">
                    <h1>Vicky</h1>
                    <h1>Tajpuriya</h1>
                  </span>
                  <p className="text-sm font-extralight">
                    @vickytajpuriya . may 8
                  </p>
                  <Divider className="mb-4 mt-2" />
                </span>
              </div>
              <div className="relative w-full h-full ">
                <span className="h-[50%] flex bg-slate-50 p-2 rounded-3xl relative container_background">
                  <Image
                    alt="Album cover"
                    className="object-cover rounded-[30px] border-4"
                    src="https://nextui.org/images/album-cover.png"
                    width="100px"
                  />
                  <span
                    style={{
                      backgroundColor: "hsl(0deg 0% 0% / 50%)",
                      backdropFilter: "blur(5px)",
                    }}
                    className=" items-center p-3  w-[95%] flex h-[45px] absolute bottom-[-20px] rounded-xl"
                  >
                    <Chip radius="sm" variant="light" startContent={<BsBox />}>
                      0 Ordered
                    </Chip>
                  </span>
                </span>
                <span className=""></span>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </ReactLenis>
  );
}
