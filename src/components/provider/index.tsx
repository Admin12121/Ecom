"use client";

import { useRef } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { Toaster } from "sonner";
import Spinner from "@/components/ui/spinner";
import { Provider as ReduxProvider } from "react-redux";
import { store, AppStore } from "@/lib/store/store";
import { AuthProvider } from "@/lib/context";
import { CartProvider } from "@/lib/cart-context";

export const Provider = ({ children, ...props }: ThemeProviderProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster
        icons={{ loading: <Spinner size="sm" color="secondary" /> }}
        invert={true}
        pauseWhenPageIsHidden={true}
        theme="system"
        position="bottom-right"
      />
      <ReduxProvider store={storeRef.current}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </ReduxProvider>
    </NextThemesProvider>
  );
};
