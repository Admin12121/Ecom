"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useGetlayoutQuery , useUpdateLayoutCardMutation} from "@/lib/store/Service/User_Auth_Api";
import ImageUploaderForm from "./imageUploader";
import { toast } from "sonner";
import LayoutUploaderForm from "./UpdateImage";
import Image from "next/image";
import { AppleCardsCarouselDemo } from "./Updating_card";
import { Switch } from "@nextui-org/react";
interface ImageData {
  id: number;
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

const Playbround = ({params}:{params:{ layoutslug: string }}) => {
  const layoutslug = decodeURIComponent(params.layoutslug);
  const { data, refetch } = useGetlayoutQuery({ layoutslug });
  const [isSelected, setIsSelected] = React.useState(data?.active);
  const [updateLayoutCard] = useUpdateLayoutCardMutation();

  useEffect(() => {
    setIsSelected(data?.active);
  }, [data]);

  const handleActive = async () => {
    if(data.id){
      const response = await updateLayoutCard({layoutslug, id: data?.id, formData: !isSelected});
      if (response.data) {
        setIsSelected(response.data.active);
        refetch();
        toast.success("Activated successfully");
      }else{
        toast.error("Failed to activate");
      }
    }
  };
  return (
    <>
      <div className="flex w-full items-end justify-end">
        <Switch color="success" isSelected={isSelected} onValueChange={handleActive}/>
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
            no_image={data?.no_image}
            refetch={refetch}
            slug={layoutslug}
          />
        )}
      </div>
    </>
  );
};

export default Playbround;
