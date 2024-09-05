"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useGetlayoutQuery } from "@/lib/store/Service/User_Auth_Api";
import ImageUploaderForm from "./imageUploader";
import LayoutUploaderForm from "./UpdateImage";
import Image from "next/image";
import { AppleCardsCarouselDemo } from "./Updating_card";
import { Switch } from "@nextui-org/react";

interface ImageData {
  image_id: string;
  image: string;
  links: {id: number, link: string}[];
  titles: {id: number, title: string}[];
  link_no: number;
  title_no: number;
}

interface LayoutData {
  name: string;
  layout_slug: string;
  non_deletable: boolean;
  active: boolean;
  images: ImageData[];
  no_image: number;
}

const Playbround = () => {
  const params = useParams<{ layoutslug: string }>();
  const layoutslug = decodeURIComponent(params.layoutslug);
  const { data, refetch } = useGetlayoutQuery({ layoutslug });
  return (
    <>
      <div className="flex w-full items-end justify-end">
        <Switch color="success"/>
      </div>
      <div className="p-5 flex flex-col gap-3">
      {data?.no_image !== data?.images?.length && <ImageUploaderForm
          initialData={data}
          refetch={refetch}
          slug={layoutslug}
        />}
        {data?.images && (
          <AppleCardsCarouselDemo
            initialData={data?.images}
            refetch={refetch}
            slug={layoutslug}
          />
        )}
      </div>
    </>
  );
};

export default Playbround;
