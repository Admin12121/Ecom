"use client"
import dynamic from 'next/dynamic'
// import { ReactLenis, useLenis } from 'lenis/react'
import { useCart } from '@/context/CartState';
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api"
import { useSearchParams } from 'next/navigation';

const Login = dynamic(() => import('@/components/User/LoginModel/Login'), { ssr: false })
const Content = dynamic(() => import('./Content/Content'), { ssr: false })

const Category = () => {
  const { isOpen, onOpenChange } = useCart();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');  
  const {data, isLoading, refetch} = useProductsViewQuery({category})

  return (
    <>
    {/* <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}> */}
      <div className="w-full min-h-[100vh] h-full flex">     
         <Content productdata={data} isLoading={isLoading}/> 
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    {/* </ReactLenis> */}
    </>
  )
}

export default Category
