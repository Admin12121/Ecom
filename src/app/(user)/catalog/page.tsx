"use client"
import { ReactLenis, useLenis } from 'lenis/react'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import { useState } from 'react'
import { Login } from "@/components/Login/Login";
import { useCart } from '@/context/CartState';

const Category = () => {
  const { isOpen, onOpenChange } = useCart();
  const [product, SetProduct] = useState<boolean>(false)
  const [productState, setProductState] = useState<{ isActive: boolean, selectedId: number | null }>({ isActive: false, selectedId: null });

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="w-full min-h-[100vh] h-full flex">     
      {!productState.isActive && <Sidebar />}
         <Content productState={productState} setProductState={setProductState}/> 
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange}/>
    </ReactLenis>
  )
}

export default Category
