"use client";
import { useRef } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
// import { AuthProvider } from "@/context/AuthContext";
import { store, AppStore } from "@/lib/store/store";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic';
// import Curve from "./components/Animation/page";
const AuthProvider = dynamic(() => import('@/context/AuthContext').then(mod => mod.AuthProvider), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }
  return (
    <NextUIProvider>
      <Toaster closeButton position="top-right" />
      <Provider store={storeRef.current}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Provider>
    </NextUIProvider>
  );
}
