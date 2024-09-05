"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuPencilLine } from "react-icons/lu";
import { toast } from "sonner";
import { useCreateorUpdatelayoutMutation } from '@/lib/store/Service/User_Auth_Api';
import { Button } from '@nextui-org/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from 'next/image';
import { FaImage } from "react-icons/fa6";
import { useDropzone } from 'react-dropzone';
import {Spinner as SpinnerLoader } from "@nextui-org/react";

interface TitleFormProps {
  slug: string;
  initialData: {
    images: string[];
  };
  refetch: any;
}

const formSchema = yup.object().shape({
  images: yup.array().of(
    yup.mixed().test(
      "fileOrString",
      "Image must be a file or a string URL",
      value => value === undefined || value instanceof File || typeof value === "string"
    )
  ).optional(),
});

type FormData = yup.InferType<typeof formSchema>;

const ImageUploaderForm = ({ slug, initialData, refetch }: TitleFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [UpdateImage, { isLoading }] = useCreateorUpdatelayoutMutation();
  const form = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: { images: initialData?.images || [] } ,
  });
  const { isSubmitting } = form.formState;
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newImageUrls]);

    const currentImages = form.getValues('images') || [];
    form.setValue('images', [...currentImages, ...acceptedFiles]);
    setisEditing(true);
    form.handleSubmit(onSubmit)();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<FormData> = async (value) => {
    setUploading(true);
    const formData = new FormData();

    value.images?.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });

    const res = await UpdateImage({ layoutslug: slug, NewFormData: formData });
    setUploading(false);

    if (res?.data) {
      toast.success('Course images updated');
      refetch();
      setisEditing(false);
    } else if (res.error) {
      toast.error('Failed to update course images');
    }
  };

  const handleCancel = () => {
    setisEditing(!isEditing);
    // setImageUrls(initialData.images);
    form.setValue('images', initialData.images);
  };

  return (
    <div className="dark:bg-neutral-900 rounded-md p-2 px-4">
      <div className="font-medium flex items-center justify-between">
        Course Images
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="p-2 gap-1"
        >
          {isEditing ? "Cancel" : <><LuPencilLine size={16} /> Upload Images</>}
        </Button>
      </div>
      <div className="bg-neutral-800 w-full overflow-hidden h-60 my-1 cursor-pointer rounded-md flex items-center justify-center" {...getRootProps()}>
        <input {...getInputProps()} />
        {/* {uploading ? <SpinnerLoader /> : (imageUrls && imageUrls.length && !isEditing ? (
          imageUrls.map((url, index) => (
            <Image key={index} src={url} alt={`${slug}-${index}`} quality={100} width="400" height="300" className="w-full h-full object-cover" priority/>
          ))
        ) : (
          ))} */}
          <FaImage size={34} />
      </div>

      {isEditing && <p className="text-sm text-gray-500">Max file size: 5MB</p>}
    </div>
  );
}

export default ImageUploaderForm;