"use client";
import { useRef } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { store, AppStore } from "@/lib/store/store";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartState";
import { Spinner } from "@nextui-org/react";
// import Curve from "./components/Animation/page";
import { SessionProvider } from "next-auth/react";

const AuthProvider = dynamic(
  () => import("@/context/AuthContext").then((mod) => mod.AuthProvider),
  { ssr: false }
);
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: any;
}
export function Providers({ children, themeProps, session }: ProvidersProps) {
  const router = useRouter();
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Toaster
          icons={{ loading: <Spinner size="sm" color="secondary" /> }}
          invert={true}
          pauseWhenPageIsHidden={true}
          theme="system"
          position="top-right"
        />
        <SessionProvider session={session}>
          <Provider store={storeRef.current}>
            <AuthProvider>
              <CartProvider>{children}</CartProvider>
            </AuthProvider>
          </Provider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
