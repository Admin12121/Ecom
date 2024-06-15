"use client";
import { useRef } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
// import { AuthProvider } from "@/context/AuthContext";
import { store, AppStore } from "@/lib/store/store";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartState";
// import Curve from "./components/Animation/page";

const AuthProvider = dynamic(
  () => import("@/context/AuthContext").then((mod) => mod.AuthProvider),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <NextUIProvider>
      <Toaster closeButton position="top-right" />
      <Provider store={storeRef.current}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </Provider>
    </NextUIProvider>
  );
}
