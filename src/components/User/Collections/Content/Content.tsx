import CardBox  from "../Card/card";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { FormData } from "@/types/product";
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

interface Productdata {
  count: number;
  next: string | null;
  previous: string | null;
  results: FormData[] | null;
}

interface ContentProps {
  params?: string;
  productdata: Productdata;
}


const Content: React.FC<ContentProps> = ({ params, productdata }) => {
  const [products, SetProducts] = useState<FormData[] | null>([]);
  useEffect(() => {
    SetProducts(productdata?.results);
  }, [productdata]);
  const [filters, setFilters] = useState<boolean>(false)
  return (
    <div className={`w-full main-contant`}>
      <Header params={params} setFilters={setFilters} filters={filters}/>
      <span className="flex">
        <div className="w-full pt-40 px-10 flex flex-wrap gap-x-10 gap-y-40 items-center justify-center main-contant-items">
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="product-card">
                  <CardBox
                    product={product}
                    clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}
                  />
                </div>
              );
            })}
        </div>
        {filters && 
          <div className="w-[600px] p-[10px] max-md:fixed max-md:w-full max-md:top-[120px] max-md:z-50">
            <span className="flex w-full rounded-md sticky top-[130px] h-[82vh] max-md:bg-neutral-950 ">
              <Sidebar/>
            </span>
          </div>}
      </span>
    </div>
  );
};

export default Content;
