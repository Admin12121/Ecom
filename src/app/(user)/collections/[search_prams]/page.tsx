"use client"
import { ReactLenis, useLenis } from 'lenis/react'
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'
import { Login } from "@/components/Login/Login";
import { useCart } from '@/context/CartState';
import { useParams } from "next/navigation";
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api"

const Category = () => {
  const params = useParams<{ search_prams: string }>();
  const { isOpen, onOpenChange } = useCart();
  const search = params.search_prams
  const {data, isLoading, refetch} = useProductsViewQuery({search})

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="w-full min-h-[100vh] h-full flex">     
      {/* <Sidebar /> */}
         <Content params={params.search_prams} productdata={data}/> 
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    </ReactLenis>
  )
}

export default Category
