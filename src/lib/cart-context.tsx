import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { getDecryptedProductList, updateProductList } from "@/lib/utils";
import { cartEvents } from "@/lib/utils";
import {
  useCartViewQuery,
  useCartPostMutation,
} from "@/lib/store/Service/User_Auth_Api";
import { authUser } from "@/hooks/use-auth-user";

interface CartProduct {
  product: number;
  variant: number;
  pcs?: number;
}

interface CartContextType {
  totalPieces: number;
  cartdata: CartProduct[];
  HandleIncreaseItems: ({
    product,
    variant,
  }: {
    product: number;
    variant: number;
  }) => void;
  HandledecreaseItems: ({
    product,
    variant,
  }: {
    product: number;
    variant: number;
  }) => void;
}

interface CartProduct {
  id?: number;
  user?: number;
  product: number;
  variant: number;
  pcs?: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { status, accessToken, user } = authUser();
  const [cartdata, setCartItems] = useState(getDecryptedProductList());
  const [postCartItem] = useCartPostMutation();

  const { data: serverCart }: { data?: CartProduct[] } = useCartViewQuery(
    { token: accessToken },
    { skip: !status }
  );

  const compareCartData = useCallback(() => {
    if (!status || !serverCart)
      return { missingInCart: [], missingInServer: [] };

    const missingInCart = serverCart
      .filter(
        (serverItem) =>
          !cartdata.some(
            (cartItem) =>
              cartItem.product === serverItem.product &&
              cartItem.variant === serverItem.variant
          )
      )
      .map((serverItem) => ({
        product: serverItem.product,
        variant: serverItem.variant,
        pcs: serverItem.pcs,
      }));

    const missingInServer = cartdata
      .filter(
        (cartItem) =>
          !serverCart.some(
            (serverItem) =>
              serverItem.product === cartItem.product &&
              serverItem.variant === cartItem.variant
          )
      )
      .map((cartItem) => ({
        product: cartItem.product,
        variant: cartItem.variant,
        pcs: cartItem.pcs,
      }));

    return { missingInCart, missingInServer };
  }, [cartdata, serverCart, status]);

  useEffect(() => {
    const handleCartSync = async () => {
      if (serverCart) {
        const { missingInCart, missingInServer } = compareCartData();
        if (missingInCart.length > 0) {
          missingInCart.forEach((item) => {
            updateProductList(item);
          });
        }
        if (missingInServer.length > 0) {
          const items = { items: missingInServer.map(({ product, variant, pcs }) => ({ id:product, variantId:variant, pcs })) };
          const res = await postCartItem({
            actualData: items,
            token: accessToken,
          });
          if (res.data) {
            console.log("Cart Updated");
          }
        }
      }
    };
    handleCartSync();
  }, [serverCart, cartdata]);

  useEffect(() => {
    const handleCartUpdate = () => {
      setTimeout(() => {
        setCartItems(getDecryptedProductList());
      }, 500);
    };
    cartEvents.on("cartUpdated", handleCartUpdate);
    return () => {
      cartEvents.off("cartUpdated", handleCartUpdate);
    };
  }, []);

  const totalPieces = useMemo(() => {
    return cartdata.reduce((acc, item) => {
      return acc + (item.pcs ?? 0);
    }, 0);
  }, [cartdata]);

  const HandleIncreaseItems = ({
    product,
    variant,
  }: {
    product: number;
    variant: number;
  }) => {
    const productdata = { product, variant };
    updateProductList(productdata);
  };

  const HandledecreaseItems = ({
    product,
    variant,
  }: {
    product: number;
    variant: number;
  }) => {
    const productdata = { product, variant };
    updateProductList(productdata, false);
    setCartItems(getDecryptedProductList());
  };

  return (
    <CartContext.Provider
      value={{
        cartdata,
        HandleIncreaseItems,
        HandledecreaseItems,
        totalPieces,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
