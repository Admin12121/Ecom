import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet/Sheet";
import { Badge } from "@nextui-org/react";
import { IoCartOutline } from "react-icons/io5";
import { Button, Card, Spinner, CardBody, Image, Divider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { FormData, Variant } from "@/types/product";
import { useCart } from "@/context/CartState";
import { AiFillDelete } from "react-icons/ai";
import {useCartViewQuery, useCartPostMutation, useCartUpdateMutation, useCartDeleteMutation} from "@/lib/store/Service/User_Auth_Api"

interface CartItem {
  id: number;
  variantId: number;
}

interface TotalPriceData {
  totalPrice: number;
  currencySymbol: string;
}

interface LinkProps {
  data: any;
  variantId: number;
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

export default function SheetDemo() {
  const { counter } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button isIconOnly variant="light" className="overflow-visible">
          <Badge color="secondary" id="js-shopping-bag-counter" content={counter} shape="circle">
            <IoCartOutline size={30} />
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 w-[97vw] mr-[1.5vw] md:min-w-[500px] h-[98vh] top-[1vh] rounded-lg bg-neutral-950 md:mr-2">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription className="text-zinc-400 text-sm bg-neutral-900 p-3 rounded-md ">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <CartWrapper />
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface CartItem {
  id: number;
  variantId: number;
}

const CartWrapper = () => {
  const { isLoggedIn, convertPrice } = useAuth();
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<FormData[]>([]);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [totalPriceData, setTotalPriceData] = useState<TotalPriceData>({
    totalPrice: 0.0,
    currencySymbol: "",
  });
  const { counter } = useCart();
  const { data: serverCartData } = useCartViewQuery({}, { skip: !isLoggedIn });
  const [postCartItem] = useCartPostMutation();

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartItemsFromStorage);
    setIsRefetch(false);
  }, [counter]);

  useEffect(() => {
    if (isLoggedIn && Array.isArray(serverCartData)) {
      const serverCartItems = serverCartData.map((item: any) => ({
        id: item.product,
        variantId: item.variant,
      }));

      const localStorageCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemsToPost: CartItem[] = localStorageCartItems.filter(
        (localItem: CartItem) =>
          !serverCartItems.some(
            (serverItem: CartItem) =>
              serverItem.id === localItem.id && serverItem.variantId === localItem.variantId
          )
        );        
      if (itemsToPost.length > 0) {
        postCartItem({ items: itemsToPost })
      }

      const newLocalStorageCartItems: CartItem[] = [...localStorageCartItems];
      console.log("localstorage current data",newLocalStorageCartItems)
      serverCartItems.forEach((serverItem: CartItem) => {
        if (
          !newLocalStorageCartItems.some(
            (localItem: CartItem) =>
              localItem.id === serverItem.id && localItem.variantId === serverItem.variantId
          )
        ) {
          newLocalStorageCartItems.push(serverItem);
        }
      });
      console.log("after filter new local storage data need to be",newLocalStorageCartItems)
      // Update local storage and state
      localStorage.setItem("cart", JSON.stringify(newLocalStorageCartItems));
    }
  }, [isLoggedIn, serverCartData, postCartItem]);

  
  const productIds = useMemo(() => cartItems.map((item) => item.id), [cartItems]);

  const { data, isLoading, refetch } = useProductsViewQuery(
    { ids: productIds.join(",") },
    { skip: productIds.length === 0 }
  );

  useEffect(() => {
    setProducts(data?.results || []);
    setIsRefetch(true);
  }, [data]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      let symbol = "";

      cartItems.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        if (product) {
          const price = getVariantData(product.variants || null, "price", cartItem.variantId);
          if (price) {
            const { convertedPrice, symbol: convertedSymbol } = convertPrice(price);
            total += convertedPrice;
            symbol = convertedSymbol;
          }
        }
      });

      setTotalPriceData({ totalPrice: total, currencySymbol: symbol });
    };

    if (products.length > 0) {
      calculateTotalPrice();
    }
  }, [cartItems, products, convertPrice]);

  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
    setIsRefetch(false);
  }, [isRefetch, refetch]);

  return (
    <div data-lenis-prevent className="flex flex-col gap-4 py-5 max-h-[75vh] overflow-y-auto overflow-hidden mt-3">
      {isLoading ? (
        <Spinner color="default"/>
      ) : (
        <>
          <h1 className="text-xl">
            Your cart total is {totalPriceData.currencySymbol} {totalPriceData.totalPrice}
          </h1>
          {products.map((product, index) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            return cartItem ? (
              <CartItem
                key={index}
                data={{ ...product, index }}
                variantId={cartItem.variantId}
                setSelectedIndicator={setSelectedIndicator}
                refetch={setIsRefetch}
              />
            ) : null;
          })}
          <Card className="min-h-[105px]">
            <CardBody className="flex text-sm gap-1">
              <span className="flex w-full justify-between items-center">
                <p>Subtotal </p>
                <p>
                  {totalPriceData.currencySymbol} {totalPriceData.totalPrice}
                </p>
              </span>
              <span className="flex w-full justify-between items-center">
                <p>Shipping </p>
                <p>Free</p>
              </span>
              <Divider className="my-1" />
              <span className="flex w-full justify-between items-center">
                <p>Total </p>
                <p>
                  {totalPriceData.currencySymbol} {totalPriceData.totalPrice}
                </p>
              </span>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

const CartItem: React.FC<LinkProps> = ({ data, variantId, setSelectedIndicator, refetch }) => {
  const { images, product_name, categoryname, variants, id } = data;
  const { isLoggedIn, convertPrice } = useAuth();
  const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(null);
  const { counter, setCounter } = useCart();
  const [deleteCartItem] = useCartDeleteMutation();

  useEffect(() => {
    if (variants) {
      setVariantsData(variants);
    }
  }, [variants]);

  const variantPrice = useMemo(() => getVariantData(variantsdata, "price", variantId), [variantsdata, variantId]);
  const { convertedPrice, symbol } = useMemo(() => convertPrice(variantPrice), [convertPrice, variantPrice]);

  const truncateText = useCallback((text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const response = await deleteCartItem({id}).unwrap();
        if (response && response.msg === 'Item removed from cart') {
          const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
          const updatedCartItems = cartItemsFromStorage.filter(
            (item: CartItem) => !(item.id === id && item.variantId === variantId)
          );

          localStorage.setItem("cart", JSON.stringify(updatedCartItems));
          setCounter(counter - 1);
          refetch(true);
        }
      }else{
        const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCartItems = cartItemsFromStorage.filter(
          (item: CartItem) => !(item.id === id && item.variantId === variantId)
        );

        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        setCounter(counter - 1);
        refetch(true);        
      }
    } catch (error) {
      console.error("Failed to delete item from server:", error);
    }
  }, [counter, id, variantId, refetch, setCounter, deleteCartItem, isLoggedIn]);  

  // const handleDelete = useCallback(() => {
  //   const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const updatedCartItems = cartItemsFromStorage.filter(
  //     (item: CartItem) => !(item.id === id && item.variantId === variantId)
  //   );

  //   localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  //   setCounter(counter - 1);
  //   refetch(true);
  // }, [counter, id, variantId, refetch, setCounter]);

  return (
    <Card className="w-full rounded-md shadow-none bg-transparent min-h-[100px] bg-neutral-950">
      <CardBody className="flex justify-between flex-row items-center">
        <span className="flex gap-5 items-center">
          <Image
            alt="nextui logo"
            height={50}
            isBlurred
            radius="md"
            src={images[0].image}
            width={50}
            className="max-w-[50px] max-h-[50px] w-[50px] object-contain"
          />
          <span className="flex items-start flex-col gap-2 justify-between">
            <span>
              <p className="text-base">{truncateText(product_name, 25)}</p>
              <p className="text-sm text-zinc-400">{categoryname}</p>
            </span>
            <Button
              isIconOnly
              color="secondary"
              aria-label="Like"
              onClick={handleDelete}
              className="max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
            >
              <AiFillDelete color="#ffffffd6" size={15} />
            </Button>
          </span>
        </span>
        <span className="flex justify-between flex-col h-full">
          <p className="text-sm bg-orange-500 rounded-md text-center">
            - {getVariantData(variantsdata, "discount", variantId)} %
          </p>
          <p className="text-base">
            {symbol} {convertedPrice}
          </p>
        </span>
      </CardBody>
    </Card>
  );
};
