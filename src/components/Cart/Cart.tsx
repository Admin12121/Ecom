import React, { useState, useEffect,useCallback } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "./anim";
import Index from "./Link";
import Curve from "./Curve";
import Footer from "./Footer";
import useAuth from "@/context/AuthContext";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { FormData, Variant } from "@/types/product";
import { useCart } from "@/context/CartState";

interface CartItem {
  id: number;
  variantId: number;
}

interface TotalPriceData {
  totalPrice: number;
  currencySymbol: string;
}

const getVariantData = (
  variantsdata: Variant[] | Variant | null,
  key: keyof Variant,
  variantId: number
): any => {
  if (Array.isArray(variantsdata)) {
    const variant = variantsdata.find((variant) => variant.id === variantId);
    return variant ? variant[key] : null;
  } else if (variantsdata) {
    return variantsdata[key];
  }
  return null;
};


export default function Cart({
  setIsActive,
  isActive,
}: {
  isActive: boolean;
  setIsActive: any;
}) {
  const { isLoggedIn, convertPrice } = useAuth();
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, SetProducts] = useState<FormData[]>([]);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [totalPriceData, setTotalPriceData] = useState<TotalPriceData>({
    totalPrice: 0.0,
    currencySymbol: "",
  });
  const { counter } = useCart();

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartItems(cartItemsFromStorage);
    setIsRefetch(false);
  }, [counter]);

  const productIds = cartItems.map((item) => item.id);

  const { data, isLoading, refetch } = useProductsViewQuery(
    { ids: productIds.join(",") },
    { skip: productIds.length === 0 }
  );

  useEffect(() => {
    SetProducts(data?.results);
    setIsRefetch(true);
  }, [data]);


  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      let symbol = "";

      cartItems.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        if (product) {
          const price = getVariantData(
            product.variants || null,
            "price",
            cartItem.variantId
          );
          if (price) {
            const { convertedPrice, symbol: convertedSymbol } = convertPrice(
              price
            );
            total += convertedPrice;
            symbol = convertedSymbol;
          }
        }
      });

      setTotalPriceData({ totalPrice: total, currencySymbol: symbol });
    };

    if(products){
      calculateTotalPrice();
    }
  }, [cartItems, products, convertPrice]);


  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
    setIsRefetch(false)
  }, [counter]);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className="absolute inset-0 w-full h-full rounded-b-[18px] rounded-bl-[18px] bg-black flex items-center justify-center [mask-image:radial-gradient(800px_450px_at_top,transparent_50%,white)]"></div>
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p className="text-lg">Shopping Cart</p>
          </div>
          {products &&
            products.map((product, index) => {
              const cartItem = cartItems.find((item) => item.id === product.id);
              return cartItem ? (
                <Index
                  key={index}
                  data={{ ...product, index }}
                  variantId={cartItem.variantId}
                  setSelectedIndicator={setSelectedIndicator}           
                  refetch={setIsRefetch}       
                ></Index>
              ) : null;
            })}
        </div>
        <Footer setIsActive={setIsActive} isActive={isActive} totalPrice={totalPriceData} />
      </div>
      <Curve />
    </motion.div>
  );
}
