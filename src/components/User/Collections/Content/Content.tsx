import CardBox  from "../Card/card";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { FormData } from "@/types/product";
import dynamic from 'next/dynamic'
import SpinnerLocal from "@/components/ui/spinner";

const Sidebar = dynamic(() => import('./Sidebar'))

interface Productdata {
  count: number;
  next: string | null;
  previous: string | null;
  results: FormData[] | null;
}

interface ContentProps {
  params?: string;
  productdata: Productdata;
  isLoading: boolean;
}


const Content: React.FC<ContentProps> = ({ params, productdata , isLoading}) => {
  const [products, SetProducts] = useState<FormData[] | null>([]);
  useEffect(() => {
    SetProducts(productdata?.results);
  }, [productdata]);
  const [filters, setFilters] = useState<boolean>(false)
  return (
    <div className={`w-full main-contant flex flex-col items-center`}>
      <Header params={params} setFilters={setFilters} filters={filters}/>
      <span className="flex justify-between max-md:flex-col-reverse">
        {isLoading ? <div className="w-full h-full flex items-center justify-center"><SpinnerLocal /></div> : 
        (<div className={`pt-40 px-4 md:px-10 gap-x-10 gap-y-40 grid max-sm-2:!grid-cols-1 max-md:grid-cols-2 md:grid-cols-2 ${filters ? 'lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4' : 'lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'} 2xl:grid-cols-4 main-contant-items`}>
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="product-card flex justify-center items-center">
                  <CardBox
                    product={product}
                    clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`}
                  />
                </div>
              );
            })}
        </div>)}
        {filters && 
          <div className="w-[500px] p-[10px] max-md:w-full max-md:top-[120px] max-md:z-50">
            <span className="flex w-full rounded-md sticky top-[130px] h-[82vh] max-md:bg-neutral-950 ">
              <Sidebar/>
            </span>
          </div>}
      </span>
    </div>
  );
};

export default Content;
