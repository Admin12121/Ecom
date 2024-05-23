"use client"
import { useRef } from 'react'
import {NextUIProvider} from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/lib/store/store'
import { Toaster } from "sonner";
export function Providers({children}: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store()
  }
  return (
    <NextUIProvider>
      <Toaster closeButton position="top-right"/>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </NextUIProvider>
  )
}