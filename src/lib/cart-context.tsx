"use client";
import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { getDecryptedProductList } from "@/lib/utils";
import {
  useCartViewQuery,
  useCartPostMutation,
  useCartDeleteMutation,
  useCartUpdateMutation,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

interface CartProduct {
  user?: number;
  product: number;
  variant: number;
  pcs?: number;
}

interface HandleProps {
  product: number;
  variant: number;
}

interface CartContextType {
  totalPieces: number;
  cartdata: CartProduct[];
  updateProductList: (newProduct: CartProduct, increment?: boolean) => void;
  HandleIncreaseItems: ({ product, variant }: HandleProps) => void;
  HandledecreaseItems: ({ product, variant }: HandleProps) => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { status, accessToken } = useAuthUser();

  const [cartdata, setCartItems] = useState<CartProduct[]>([]);

  const [postCartItem, { isLoading: postLoading }] = useCartPostMutation();
  const [deleteCart, { isLoading: deleteLoading }] = useCartDeleteMutation();
  const [updateCart, { isLoading: updateLoading }] = useCartUpdateMutation();
  const { data: serverCart }: { data?: CartProduct[] } = useCartViewQuery(
    { token: accessToken },
    { skip: !status }
  );

  useEffect(() => {
    setCartItems(getDecryptedProductList());
  }, []);

  const [loading, setLoading] = useState(false);
  const hasSyncedRef = useRef(false);

  const HandleAction = async ({
    action,
    successMessage,
    errorMessage,
  }: {
    action: () => Promise<any>;
    successMessage?: string;
    errorMessage?: string;
  }) => {
    if (status) {
      const res = await action();
      if (res.data) {
        setTimeout(async () => {
          setCartItems(getDecryptedProductList());
        }, 500);
        toast.success(successMessage, { position: "top-center" });
      } else {
        toast.error(errorMessage, { position: "top-center" });
      }
    } else {
      setLoading(true);
      setTimeout(async () => {
        await action();
        setLoading(false);
        toast.success(successMessage, { position: "top-center" });
      }, 500);
    }
  };

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
    if (serverCart && !hasSyncedRef.current) {
      const { missingInCart, missingInServer } = compareCartData();
      if (missingInCart.length > 0) {
        missingInCart.forEach((item) => {
          updateProductList(item);
        });
      }
      if (missingInServer.length > 0) {
        const items = {
          items: missingInServer.map(({ product, variant, pcs }) => ({
            id: product,
            variantId: variant,
            pcs: pcs ?? 0,
          })),
        };
        HandleAction({
          action: () => postCartItem({ actualData: items, token: accessToken }),
          successMessage: "Added to Cart",
          errorMessage: "Error adding to cart.",
        });
      }
      hasSyncedRef.current = true;
    }
  }, [serverCart]);

  const totalPieces = useMemo(() => {
    return cartdata.reduce((acc, item) => {
      return acc + (item.pcs ?? 0);
    }, 0);
  }, [cartdata]);

  const updateProductList = (
    newProduct: CartProduct,
    increment: boolean = true
  ): void => {
    const productList: CartProduct[] = getDecryptedProductList();

    const existingProductIndex = productList.findIndex(
      (product) =>
        product.product === newProduct.product &&
        product.variant === newProduct.variant
    );

    if (existingProductIndex > -1) {
      const existingProduct = productList[existingProductIndex];
      const currentPcs = existingProduct.pcs ?? 0;
      if (increment) {
        existingProduct.pcs = currentPcs + 1;
        if (status) {
          const item = {
            product: existingProduct.product,
            variant: existingProduct.variant,
            pcs: existingProduct.pcs,
          };
          HandleAction({
            action: () => updateCart({ actualData: item, token: accessToken }),
            successMessage: "Updated Cart",
          });
        } else {
          HandleAction({
            action: async () => {
              setCartItems(getDecryptedProductList());
            },
            successMessage: "Updated Cart",
          });
        }
      } else {
        existingProduct.pcs = currentPcs - 1;
        if (status) {
          const item = {
            product: existingProduct.product,
            variant: existingProduct.variant,
            pcs: existingProduct.pcs,
          };
          HandleAction({
            action: () => updateCart({ actualData: item, token: accessToken }),
            successMessage: "Updated Cart",
          });
        } else {
          HandleAction({
            action: async () => {
              setCartItems(getDecryptedProductList());
            },
            successMessage: "Updated Cart",
          });
        }
        if (existingProduct.pcs <= 0) {
          productList.splice(existingProductIndex, 1);
          if (status) {
            HandleAction({
              action: () =>
                deleteCart({
                  id: existingProduct.product,
                  variantId: existingProduct.variant,
                  token: accessToken,
                }),
              successMessage: "Removed from Cart",
            });
          } else {
            HandleAction({
              action: async () => {
                setCartItems(getDecryptedProductList());
              },
              successMessage: "Removed from Cart",
            });
          }
        }
      }
    } else if (increment) {
      productList.push({ ...newProduct, pcs: 1 });
      if (status) {
        const items = {
          items: [
            { id: newProduct.product, variantId: newProduct.variant, pcs: 1 },
          ],
        };
        HandleAction({
          action: () => postCartItem({ actualData: items, token: accessToken }),
          successMessage: "Added to Cart",
        });
      } else {
        HandleAction({
          action: async () => {
            setCartItems(getDecryptedProductList());
          },
          successMessage: "Added to Cart",
        });
      }
    }
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(productList),
      NEXTAUTH_SECRET
    ).toString();
    localStorage.setItem("productList", encryptedData);
  };

  const HandleIncreaseItems = ({ product, variant }: HandleProps) => {
    const productdata = { product, variant };
    updateProductList(productdata);
  };

  const HandledecreaseItems = ({ product, variant }: HandleProps) => {
    const productdata = { product, variant };
    updateProductList(productdata, false);
  };

  return (
    <CartContext.Provider
      value={{
        cartdata,
        updateProductList,
        HandleIncreaseItems,
        HandledecreaseItems,
        totalPieces,
        loading: postLoading || deleteLoading || updateLoading || loading,
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
