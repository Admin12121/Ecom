"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuPencilLine } from "react-icons/lu";
import { toast } from "sonner";
import { useCreateorUpdatelayoutMutation } from '@/lib/store/Service/User_Auth_Api';
import { Button } from '@nextui-org/react';
import { FaImage } from "react-icons/fa6";
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Spinner as SpinnerLoader } from "@nextui-org/react";

interface ImageData {
  image_id: string;
  image: string;
  links: string[];
  titles: string[];
}

interface TitleFormProps {
  slug: string;
  initialData: ImageData;
  refetch: any;
}

const formSchema = yup.object().shape({
  image: yup.array().of(
    yup.mixed().test(
      "fileOrString",
      "Image must be a file or a string URL",
      value => value === undefined || value instanceof File || typeof value === "string"
    )
  ).optional(),
});

type FormData = yup.InferType<typeof formSchema>;

const LayoutUploaderForm = ({ slug, initialData, refetch }: TitleFormProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [UpdateImage, { isLoading }] = useCreateorUpdatelayoutMutation();
  const form = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: { image: initialData?.image ? [initialData.image] : [] },
  });
  const { isSubmitting } = form.formState;
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newImageUrls]);

    const currentImages = form.getValues('image') || [];
    form.setValue('image', [...currentImages, ...acceptedFiles]);
    setisEditing(true);
    form.handleSubmit(onSubmit)();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<FormData> = async (value) => {
    setUploading(true);
    const formData = new FormData();

    value.image?.forEach((image, index) => {
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
    form.setValue('image', initialData.image ? [initialData.image] : []);
  };

  return (
    <div className="mt-6 dark:bg-neutral-900 rounded-md p-2 px-4">
      <div className="font-medium flex items-center justify-between">
        Layout Data
        <Button
          variant="flat"
          onClick={handleCancel}
          className="p-2 gap-1"
        >
          {isEditing ? "Cancel" : <><LuPencilLine size={16} /> Edit Layout</>}
        </Button>
      </div>
      <div className="bg-neutral-800 w-full overflow-hidden h-60 my-1 cursor-pointer rounded-md flex items-center justify-center" {...getRootProps()}>
        {isEditing && <input {...getInputProps()} />}
        {initialData.image ?  <Image src={initialData.image} alt={`${slug}`} quality={100} width="400" height="300" className="w-full h-full object-cover" priority/> : "" }
        {uploading ? <SpinnerLoader /> : <FaImage size={34} />}
      </div>
      {isEditing && <p className="text-sm text-gray-500">Max file size: 5MB</p>}
    </div>
  );
}

export default LayoutUploaderForm;