"use client";
import dynamic from "next/dynamic";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { useSearchParams } from "next/navigation";

const Content = dynamic(() => import("./content"), { ssr: false });

const Category = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { data, isLoading, refetch } = useProductsViewQuery({ category });

  return (
    <div className="w-full min-h-[100vh] h-full flex">
      <Content productdata={data} isLoading={isLoading} />
    </div>
  );
};

export default Category;
