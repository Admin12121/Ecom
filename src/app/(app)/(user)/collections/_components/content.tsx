import { ProductCard, ProductSkeleton } from "@/components/global/product-card";
import React, { useState, useEffect } from "react";
// import Header from "../Header/Header";
import { Product } from "@/types/product";

// const Sidebar = dynamic(() => import('./Sidebar'))

interface Productdata {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[] | null;
}

interface ContentProps {
  params?: string;
  productdata: Productdata;
  isLoading: boolean;
}

const Content: React.FC<ContentProps> = ({
  params,
  productdata,
  isLoading,
}) => {
  const [products, SetProducts] = useState<Product[] | null>([]);
  useEffect(() => {
    SetProducts(productdata?.results);
  }, [productdata]);
  const [filters, setFilters] = useState<boolean>(false);

  const Products = ({ products, loading }:{products:Product[] | null, loading: boolean}) => {
    if (loading) {
      return Array.from({ length: 4 }, (_, index) => (
        <ProductSkeleton key={index} />
      ));
    }

    return (
      <>
        {products &&
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="product-card justify-center items-center flex flex-col relative isolate rounded-md group host default elevated-links svelte-18bpazq"
              >
                <ProductCard
                  data={product}
                  width={index === 0 ? "500px" : null}
                />
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div className={`w-full main-contant flex flex-col items-center`}>
      {/* <Header params={params} setFilters={setFilters} filters={filters}/> */}
      <span className="flex justify-between max-md:flex-col-reverse lg:px-6 px-2 py-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 transition-opacity motion-reduce:transition-none`}
        >
         <Products products={products} loading={isLoading}/>
        </div>
        {filters && (
          <div className="w-[500px] p-[10px] max-md:w-full max-md:top-[120px] max-md:z-50">
            <span className="flex w-full rounded-md sticky top-[130px] h-[82vh] max-md:bg-neutral-950 ">
              {/* <Sidebar/> */}
            </span>
          </div>
        )}
      </span>
    </div>
  );
};

export default Content;
