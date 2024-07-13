import { CardBox } from '../Card/card'
import React,{useState, useEffect} from 'react'
import Header from '../Header/Header'
import { FormData } from "@/types/product";

interface Productdata {
  count: number;
  next: string | null;
  previous: string | null;
  results: FormData[] | null;
}

interface ContentProps {
  // productState: { isActive: boolean; selectedId: number | null };
  // setProductState: React.Dispatch<React.SetStateAction<{ isActive: boolean; selectedId: number | null }>>;
  params? :string;
  productdata : Productdata;
}
interface Event {
  id: number;
  img: string;
}
const  data: Event[] = [
  {
    id: 1,
    img: "/product1.png"
  },
  {
    id: 2,
    img: "/product.png"
  },
  {
    id: 3,
    img: "/product2.png"
  },
  {
    id: 4,
    img: "/product.png"
  },
  {
    id: 5,
    img: "/product1.png"
  },
  {
    id: 6,
    img: "/product2.png"
  },
  {
    id: 7,
    img: "/product1.png"
  },
  {
    id: 8,
    img: "/product.png"
  },

]

const Content: React.FC<ContentProps> = ({ params, productdata}) => {

  const [products, SetProducts] = useState<FormData[] | null>([])
  useEffect(()=>{
    SetProducts(productdata?.results)
  },[productdata])

  return (
    <div className={`w-full main-contant`}>
        <Header params={params}/>
        <div className='w-full pt-40 px-10 flex flex-wrap gap-x-10 gap-y-40 items-center justify-center main-contant-items'>
          {products && products.map((product,index)=>{
            return(
              <div key={index} className='product-card'> 
                <CardBox product={product} clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`} />
              </div>
            )
          })}
          {/* {data.map(({img, id}:{img:string, id: number},index)=>{
            return(
              <div key={index} className='product-card'> 
                <CardBox id={id} clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`} image={img}/>
              </div>
            )
          })} */}
        </div>
    </div>
  )
}

export default Content
