"use client"
import { ReactLenis, useLenis } from 'lenis/react'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import { Login } from "@/components/Login/Login";
import { useCart } from '@/context/CartState';
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api"
import { useSearchParams } from 'next/navigation';

const Category = () => {
  const { isOpen, onOpenChange } = useCart();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');  
  const {data, isLoading, refetch} = useProductsViewQuery({category})

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="w-full min-h-[100vh] h-full flex">     
      <Sidebar />
         <Content productdata={data}/> 
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    </ReactLenis>
  )
}

export default Category
