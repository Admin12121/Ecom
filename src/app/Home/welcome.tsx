import React from "react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export default function Welcome() {
  return (
    <Image
      isBlurred
      as={NextImage}
      width={1400}
      height={500}
      src="/header.jpg"
      alt="NextUI Album Cover"
      className="m-5 w-[90vw!important] h-[80vh] object-cover"
    />
  );
}
