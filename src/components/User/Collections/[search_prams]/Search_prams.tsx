"use client"
import dynamic from 'next/dynamic'
import { ReactLenis, useLenis } from 'lenis/react'
import { useCart } from '@/context/CartState';
import { useParams } from "next/navigation";
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api"

const Login = dynamic(() => import('@/components/User/LoginModel/Login'), { ssr: false })
const Content = dynamic(() => import('../Content/Content'), { ssr: false })

const Search_prams = () => {
  const params = useParams<{ search_prams: string }>();
  const { isOpen, onOpenChange } = useCart();
  const search = params.search_prams
  const {data, isLoading, refetch} = useProductsViewQuery({search})

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="w-full min-h-[100vh] h-full flex">     
         <Content params={params.search_prams} productdata={data}/> 
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    </ReactLenis>
  )
}

export default Search_prams;
