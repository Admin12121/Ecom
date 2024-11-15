"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
} from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator as Divider } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { encryptproduct } from "@/lib/transition";
import Spinner from "@/components/ui/spinner";
import { FormData, Variant } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context";

// import {
//     Chip,
// } from "@nextui-org/react";

// import useAuth from "@/context/AuthContext";
// import { useCart } from "@/context/CartState";

import {
  useCartViewQuery,
  useCartPostMutation,
  useCartUpdateMutation,
  useCartDeleteMutation,
  useProductsByIdsQuery,
} from "@/lib/store/Service/User_Auth_Api";

import { Minus, ShoppingBag as PiHandbag, Delete, Plus } from "lucide-react";
import Icons from "./icons";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  variantId: number;
  pcs: number;
}

interface TotalPriceData {
  totalPrice: number;
  currencySymbol: string;
}

interface LinkProps {
  data: any;
  pcs: number;
  variantId: number;
  cartId: number;
  cardrefetch: any;
  serverCartId: number;
  setSelectedIndicator: any;
  refetch: (value: boolean) => void;
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

export default function Cart() {
  //   const { counter } = useCart();

  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckoutRef = useRef<() => void>(() => {});

  const handleCheckout = useCallback(() => {
    if (handleCheckoutRef.current) {
      setIsLoading(true);
      handleCheckoutRef.current();
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
          <PiHandbag className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 w-[97vw] mr-[1.5vw] md:min-w-[500px] h-[98vh] top-[1vh] rounded-lg bg-neutral-200 dark:bg-neutral-950 md:mr-2 p-3">
        <SheetHeader>
          <SheetTitle className="text-base">Cart</SheetTitle>
          <SheetDescription className="text-neutral-800 dark:text-zinc-400 text-sm bg-white dark:bg-neutral-900 p-3 rounded-md mt-4 ">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {/* <CartWrapper handleCheckoutRef={handleCheckoutRef} setIsCheckoutDisabled={setIsCheckoutDisabled} setIsLoading={setIsLoading} /> */}
        <SheetFooter>
          {/* {counter > 0 && (<span className="w-full h-[120px] flex justify-end items-start flex-col gap-2">
            <p className="text-zinc-400 text-xs">Free delivery on September 10th - 17th</p>
            <Divider className="w-full" orientation="horizontal" />
            <Icons/>
            <Divider className="w-full" orientation="horizontal" />
            <Button type="submit" className="w-full"
              onClick={handleCheckout}
              disabled={isCheckoutDisabled || isLoading}
              >
              Checkout
            </Button>
          </span>)} */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface CartItem {
  id: number;
  variantId: number;
  pcs: number;
}

interface CartWrapperProps {
  handleCheckoutRef: MutableRefObject<() => void>;
  setIsCheckoutDisabled: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

// const CartWrapper: React.FC<CartWrapperProps> = ({
//   handleCheckoutRef,
//   setIsCheckoutDisabled,
//   setIsLoading,
// }) => {
//   const { convertPrice } = useAuth();
//   const pathname = usePathname();
//   const [selectedIndicator, setSelectedIndicator] = useState(pathname);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [products, setProducts] = useState<FormData[]>([]);
//   const [isRefetch, setIsRefetch] = useState<boolean>(false);
//   const [totalPriceData, setTotalPriceData] = useState<TotalPriceData>({
//     totalPrice: 0.0,
//     currencySymbol: "",
//   });
// //   const { data: serverCartData, refetch: CardRefetch } = useCartViewQuery(
// //     {},
// //     { skip: !isLoggedIn }
// //   );
//   const [postCartItem] = useCartPostMutation();
//   const router = useRouter();

//   useEffect(() => {
//     const cartItemsFromStorage = JSON.parse(
//       localStorage.getItem("cart") || "[]"
//     );
//     setCartItems(cartItemsFromStorage);
//     setIsRefetch(false);
//   }, [counter, serverCartData]);

//   useEffect(() => {
//     if (isLoggedIn && Array.isArray(serverCartData)) {
//       const serverCartItems = serverCartData.map((item: any) => ({
//         id: item.product,
//         variantId: item.variant,
//         pcs: item.pcs,
//       }));

//       const localStorageCartItems = JSON.parse(
//         localStorage.getItem("cart") || "[]"
//       );
//       const itemsToPost: CartItem[] = localStorageCartItems.filter(
//         (localItem: CartItem) =>
//           !serverCartItems.some(
//             (serverItem: CartItem) =>
//               serverItem.id === localItem.id &&
//               serverItem.variantId === localItem.variantId &&
//               serverItem.pcs === localItem.pcs
//           )
//       );
//       if (itemsToPost.length > 0) {
//         postCartItem({ items: itemsToPost });
//       }

//       const newLocalStorageCartItems: CartItem[] = [...localStorageCartItems];
//       serverCartItems.forEach((serverItem: CartItem) => {
//         if (
//           !newLocalStorageCartItems.some(
//             (localItem: CartItem) =>
//               localItem.id === serverItem.id &&
//               localItem.variantId === serverItem.variantId
//           )
//         ) {
//           newLocalStorageCartItems.push(serverItem);
//         }
//       });
//       localStorage.setItem("cart", JSON.stringify(newLocalStorageCartItems));
//     }
//   }, [isLoggedIn, serverCartData, postCartItem]);

//   const productIds = useMemo(
//     () => cartItems.map((item) => item.id),
//     [cartItems]
//   );

//   const { data, isLoading, refetch } = useProductsByIdsQuery(
//     { ids: productIds.join(",") },
//     { skip: productIds.length === 0 }
//   );

//   useEffect(() => {
//     setProducts(data?.results || []);
//     setIsRefetch(true);
//   }, [data]);

//   useEffect(() => {
//     const calculateTotalPrice = () => {
//       let total = 0;
//       let symbol = "";

//       cartItems.forEach((cartItem) => {
//         const product = products.find((product) => product.id === cartItem.id);
//         if (product) {
//           const price = getVariantData(
//             product.variants || null,
//             "price",
//             cartItem.variantId
//           );
//           const stock = getVariantData(
//             product.variants || null,
//             "stock",
//             cartItem.variantId
//           );
//           if (price && stock > 0) {
//             const { convertedPrice, symbol: convertedSymbol } =
//               convertPrice(price);
//             total += convertedPrice * cartItem.pcs;
//             symbol = convertedSymbol;
//           }
//         }
//       });
//       total = parseFloat(total.toFixed(2));
//       setTotalPriceData({ totalPrice: total, currencySymbol: symbol });
//     };

//     if (products.length > 0) {
//       calculateTotalPrice();
//     }
//   }, [cartItems, products, convertPrice]);

//   useEffect(() => {
//     if (isRefetch) {
//       refetch();
//     }
//     setIsRefetch(false);
//   }, [isRefetch, refetch]);

//   useEffect(() => {
//     const handleCheckout = async () => {
//       if (isLoggedIn) {
//         const data = cartItems
//           .filter(
//             (item) =>
//               getVariantData(
//                 products.find((p) => p.id === item.id)?.variants || null,
//                 "stock",
//                 item.variantId
//               ) > 0
//           )
//           .map((item) => ({
//             id: item.id,
//             variantId: item.variantId,
//             pcs: item.pcs,
//           }));
//         if (data.length > 0) {
//           await encryptproduct(data, router);
//         } else {
//           setIsCheckoutDisabled(true);
//         }
//       } else {
//         router.push(`/login`);
//       }
//       setIsLoading(false);
//     };

//     handleCheckoutRef.current = handleCheckout;
//   }, [
//     isLoggedIn,
//     cartItems,
//     products,
//     router,
//     handleCheckoutRef,
//     setIsCheckoutDisabled,
//     setIsLoading,
//   ]);

//   useEffect(() => {
//     const allOutOfStock = cartItems.every(
//       (item) =>
//         getVariantData(
//           products.find((p) => p.id === item.id)?.variants || null,
//           "stock",
//           item.variantId
//         ) === 0
//     );
//     setIsCheckoutDisabled(allOutOfStock);
//   }, [cartItems, products, setIsCheckoutDisabled]);

//   return (
//     <div
//       data-lenis-prevent
//       className="flex flex-col gap-4 py-5 max-h-[62vh] h-[62vh] overflow-y-auto overflow-hidden mt-3"
//     >
//       {isLoading ? (
//         <Spinner color="default" />
//       ) : (
//         <>
//           {counter > 0 ? (
//             <>
//               <h1 className="text-xl">
//                 Your cart total is {totalPriceData.currencySymbol}{" "}
//                 {totalPriceData.totalPrice}
//               </h1>
//               {products.map((product, index) => {
//                 const cartItem = cartItems.find(
//                   (item) => item.id === product.id
//                 );
//                 const serverCartItem = serverCartData?.find(
//                   (item: any) =>
//                     item.product === product.id &&
//                     item.variant === cartItem?.variantId
//                 );
//                 return cartItem ? (
//                   <CartItem
//                     key={index}
//                     data={{ ...product, index }}
//                     variantId={cartItem.variantId}
//                     pcs={cartItem.pcs}
//                     cartId={cartItem.id}
//                     serverCartId={serverCartItem?.id}
//                     setSelectedIndicator={setSelectedIndicator}
//                     refetch={setIsRefetch}
//                     cardrefetch={CardRefetch}
//                   />
//                 ) : null;
//               })}
//               <Card className="min-h-[105px]">
//                 <CardBody className="flex text-sm gap-1">
//                   <span className="flex w-full justify-between items-center">
//                     <p>Subtotal </p>
//                     <p>
//                       {totalPriceData.currencySymbol}{" "}
//                       {totalPriceData.totalPrice}
//                     </p>
//                   </span>
//                   <span className="flex w-full justify-between items-center">
//                     <p>Shipping </p>
//                     <p>Free</p>
//                   </span>
//                   <Divider className="my-1" />
//                   <span className="flex w-full justify-between items-center">
//                     <p>Total </p>
//                     <p>
//                       {totalPriceData.currencySymbol}{" "}
//                       {totalPriceData.totalPrice}
//                     </p>
//                   </span>
//                 </CardBody>
//               </Card>
//             </>
//           ) : (
//             <div className="w-full h-full min-h-[70vh] flex items-center justify-center flex-col gap-2">
//               <span className="flex flex-col items-center justify-center">
//                 <h1 className="text-2xl">Your cart is currently empty</h1>
//                 <p className="text-md text-zinc-500">
//                   Add products to your cart
//                 </p>
//               </span>
//               <SheetClose asChild>
//                 <Button
//                   className=" text-white"
//                   onClick={() => router.push("/collections")}
//                 >
//                   Shop Now
//                 </Button>
//               </SheetClose>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const CartItem: React.FC<LinkProps> = ({
//   data,
//   variantId,
//   pcs,
//   cartId,
//   serverCartId,
//   cardrefetch,
//   setSelectedIndicator,
//   refetch,
// }) => {
//   const { images, product_name, categoryname, variants, id } = data;
//   const { convertPrice } = useAuth();
//   const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(
//     null
//   );
//   const [deleteCartItem] = useCartDeleteMutation();
//   const [updateCartItem, { isLoading: isLoadingUpdate }] =
//     useCartUpdateMutation();

//   useEffect(() => {
//     if (variants) {
//       setVariantsData(variants);
//     }
//   }, [variants]);

//   const variantPrice = useMemo(
//     () => getVariantData(variantsdata, "price", variantId),
//     [variantsdata, variantId, pcs]
//   );
//   const { convertedPrice, symbol } = useMemo(
//     () => convertPrice(variantPrice),
//     [convertPrice, variantPrice, pcs]
//   );

//   const truncateText = useCallback(
//     (text: string, maxLength: number): string => {
//       return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
//     },
//     []
//   );

//   //   const handleDelete = useCallback(async () => {
//   //     try {
//   //       if (isLoggedIn) {
//   //         const response = await deleteCartItem({ id }).unwrap();
//   //         if (response && response.msg === "Item removed from cart") {
//   //           const cartItemsFromStorage = JSON.parse(
//   //             localStorage.getItem("cart") || "[]"
//   //           );
//   //           const updatedCartItems = cartItemsFromStorage.filter(
//   //             (item: CartItem) =>
//   //               !(item.id === id && item.variantId === variantId)
//   //           );

//   //           localStorage.setItem("cart", JSON.stringify(updatedCartItems));
//   //           setCounter(counter - 1);
//   //           refetch(true);
//   //         }
//   //       } else {
//   //         const cartItemsFromStorage = JSON.parse(
//   //           localStorage.getItem("cart") || "[]"
//   //         );
//   //         const updatedCartItems = cartItemsFromStorage.filter(
//   //           (item: CartItem) => !(item.id === id && item.variantId === variantId)
//   //         );

//   //         localStorage.setItem("cart", JSON.stringify(updatedCartItems));
//   //         setCounter(counter - 1);
//   //         refetch(true);
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to delete item from server:", error);
//   //     }
//   //   }, [counter, id, variantId, refetch, setCounter, deleteCartItem, isLoggedIn]);

//   const handleAddpcs = async () => {
//     if (getVariantData(variantsdata, "stock", variantId) > pcs) {
//       try {
//         const actualData = { pcs: pcs + 1 };
//         const res = await updateCartItem({ id: serverCartId, actualData });
//         const cartItemsFromStorage = JSON.parse(
//           localStorage.getItem("cart") || "[]"
//         );
//         const updatedCartItems = cartItemsFromStorage.map((item: CartItem) =>
//           item.id === cartId && item.variantId === variantId
//             ? { ...item, pcs: item.pcs + 1 }
//             : item
//         );
//         localStorage.setItem("cart", JSON.stringify(updatedCartItems));
//         cardrefetch();
//         refetch(true);
//       } catch (error) {
//         console.error("Failed to add pcs:", error);
//       }
//     } else {
//       console.log("Not enough stock available");
//     }
//   };

//   const handleRemovepcs = async () => {
//     if (pcs > 1) {
//       try {
//         const actualdata = { pcs: pcs - 1 };
//         const res = await updateCartItem({ id: serverCartId, actualdata });
//         const cartItemsFromStorage = JSON.parse(
//           localStorage.getItem("cart") || "[]"
//         );
//         const updatedCartItems = cartItemsFromStorage.map((item: CartItem) =>
//           item.id === cartId && item.variantId === variantId
//             ? { ...item, pcs: item.pcs - 1 }
//             : item
//         );
//         localStorage.setItem("cart", JSON.stringify(updatedCartItems));
//         cardrefetch();
//         refetch(true);
//       } catch (error) {
//         console.error("Failed to remove pcs:", error);
//       }
//     } else {
//       console.log("Cannot have less than 1 pcs");
//     }
//   };

//   const handleUpdateCartItem = async () => {
//     if (pcs === 1) {
//       //   await handleDelete()
//     } else {
//       await handleRemovepcs();
//     }
//   };

//   return (
//     <Card className="w-full rounded-md shadow-none bg-transparent min-h-[100px] bg-neutral-950">
//       <CardContent className="flex justify-between flex-row items-center">
//         <span className="flex gap-5 items-center">
//           <Image
//             alt="nextui logo"
//             height={100}
//             src={images[0].image}
//             width={100}
//             className="max-w-[50px] max-h-[50px] w-[50px] object-contain"
//           />
//           <span className="flex items-start flex-col gap-2 justify-between">
//             <span>
//               <p className="text-base">{truncateText(product_name, 25)}</p>
//               <p className="text-sm text-zinc-400">{categoryname}</p>
//             </span>
//             <span className="flex items-center gap-5">
//               <Button
//                 color={pcs > 1 ? "default" : "secondary"}
//                 // variant={pcs > 1 ? "bordered" : "solid"}
//                 aria-label="Like"
//                 onClick={handleUpdateCartItem}
//                 className="cursor-pointer max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
//               >
//                 {pcs > 1 ? (
//                   <Minus size={15} />
//                 ) : (
//                   <Delete color="#ffffffd6" size={15} />
//                 )}
//               </Button>
//               {getVariantData(variantsdata, "stock", variantId) == 0 ? (
//                 <p>out of stock</p>
//               ) : (
//                 <>
//                   <p className="text-sm">{pcs}</p>
//                   <Button
//                     disabled={
//                       pcs >= getVariantData(variantsdata, "stock", variantId) ||
//                       isLoadingUpdate
//                     }
//                     // isIconOnly
//                     // variant="bordered"
//                     aria-label="Like"
//                     className="cursor-pointer max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
//                     onClick={handleAddpcs}
//                   >
//                     <Plus color="#ffffffd6" size={22} />
//                   </Button>
//                 </>
//               )}
//               {isLoadingUpdate && <Spinner size="sm" color="default" />}
//             </span>
//           </span>
//         </span>
//         <span className="flex justify-between flex-col h-full">
//           <p className="text-sm bg-orange-500 rounded-md text-center">
//             - {getVariantData(variantsdata, "discount", variantId)} %
//           </p>
//           <p className="text-base">
//             {getVariantData(variantsdata, "stock", variantId) == 0
//               ? "-"
//               : `${symbol} ${convertedPrice}`}
//           </p>
//         </span>
//       </CardContent>
//     </Card>
//   );
// };
