"use client"
import { ReactLenis, useLenis } from 'lenis/react'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import { useState } from 'react'

const page = () => {
  const [product, SetProduct] = useState<boolean>(false)
  const [productState, setProductState] = useState<{ isActive: boolean, selectedId: number | null }>({ isActive: false, selectedId: null });

  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1, wheelMultiplier: 1}}>
      <div className="w-full min-h-[100vh] h-full flex">     
      {!productState.isActive && <Sidebar />}
         <Content productState={productState} setProductState={setProductState}/> 
      </div>
    </ReactLenis>
  )
}

export default page
