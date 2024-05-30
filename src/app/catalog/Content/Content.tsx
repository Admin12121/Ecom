import { CardBox } from '@/app/catalog/Card/card'
import React from 'react'
import Header from '../Header/Header'

interface ContentProps {
  productState: { isActive: boolean; selectedId: number | null };
  setProductState: React.Dispatch<React.SetStateAction<{ isActive: boolean; selectedId: number | null }>>;
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

const Content: React.FC<ContentProps> = ({ productState, setProductState }) => {
  return (
    <div className={`w-full ${!productState.isActive && "main-contant"}`}>
        <Header/>
        <div className='w-full pt-40 px-10 flex flex-wrap gap-x-10 gap-y-32 items-center justify-center main-contant-items'>
          {!productState.isActive && data.map(({img, id}:{img:string, id: number},index)=>{
            return(
              <div key={index}> 
                <CardBox setProductState={setProductState} id={id} clasName={`${index % 2 === 0 ? "bg-neutral-950" : ""}`} image={img}/>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Content
