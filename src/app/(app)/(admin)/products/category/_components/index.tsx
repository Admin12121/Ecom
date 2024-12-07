"use client"

import React from 'react'
import AddCategory from '@/app/(app)/(admin)/products/add-product/_components/addCategory'
import AddSubCategory from '@/app/(app)/(admin)/products/add-product/_components/addSubCategory'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthUser } from "@/hooks/use-auth-user";
import { z } from "zod";

const Category = () => {
  const { accessToken } = useAuthUser();
  return (
    <main className="w-full h-full pb-10 min-h-[calc(100dvh_-_145px)] flex px-2 flex-col gap-2">
      <span className="flex justify-between items-center">
        <h1 className="text-2xl">Category</h1>
        <AddCategory token={accessToken || ""}/>
      </span>
      {/* <AddSubCategory token={accessToken || ""}/> */}
    </main>
  )
}

export default Category