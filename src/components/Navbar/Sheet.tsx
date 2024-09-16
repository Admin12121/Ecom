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
import {
  Button,
  Card,
  Spinner,
  CardBody,
  Image,
  Divider,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { useProductsViewQuery } from "@/lib/store/Service/User_Auth_Api";
import { FormData, Variant } from "@/types/product";
import { useCart } from "@/context/CartState";
import { AiFillDelete } from "react-icons/ai";
import {
  useCartViewQuery,
  useCartPostMutation,
  useCartUpdateMutation,
  useCartDeleteMutation,
} from "@/lib/store/Service/User_Auth_Api";
import { useRouter } from "next/navigation";
import { IoIosAdd } from "react-icons/io";
import { PiHandbag } from "react-icons/pi";

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
          <Badge
            color="secondary"
            id="js-shopping-bag-counter"
            content={counter}
            shape="circle"
          >
            <PiHandbag size={24} />
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
          {counter > 0 && (<span className="w-full h-[120px] flex justify-end items-start flex-col gap-2">
            <p className="text-zinc-400 text-xs">Free delivery on September 10th - 17th</p>
            <Divider className="w-full" orientation="horizontal" />
            <div className="w-full justify-end flex flex-wrap items-center gap-2">
              <span data-payment-method="visa" aria-hidden="true">
                <svg
                  width="35"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                    stroke="#343233"
                    strokeOpacity=".04"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.625 16.258h-2.12l-1.59-6.066c-.076-.279-.236-.525-.471-.642A6.902 6.902 0 0 0 4.5 8.908v-.233h3.416a.89.89 0 0 1 .884.758l.825 4.376 2.119-5.134h2.061l-3.18 7.583Zm4.359 0H12.98l1.65-7.583h2.002l-1.65 7.583Zm4.24-5.482c.058-.409.412-.642.824-.642a3.732 3.732 0 0 1 1.944.35l.353-1.633A5.068 5.068 0 0 0 20.52 8.5c-1.944 0-3.358 1.05-3.358 2.508 0 1.11 1.002 1.692 1.709 2.042.765.35 1.06.584 1 .933 0 .525-.589.759-1.177.759a5.049 5.049 0 0 1-2.061-.467l-.354 1.633a5.779 5.779 0 0 0 2.18.409c2.179.058 3.533-.992 3.533-2.567 0-1.983-2.769-2.1-2.769-2.974ZM29 16.258l-1.59-7.583h-1.708a.886.886 0 0 0-.825.583l-2.944 7h2.061l.412-1.108h2.533l.235 1.108H29Zm-3.003-5.54.588 2.857h-1.649l1.06-2.858Z"
                    fill="#172B85"
                  ></path>
                </svg>
              </span>
              <span data-payment-method="mastercard" aria-hidden="true">
                <svg
                  width="35"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                    stroke="#343233"
                    strokeOpacity=".04"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.75 17.157a6.75 6.75 0 0 1-4.426 1.649c-3.769 0-6.824-3.09-6.824-6.903C6.5 8.091 9.555 5 13.324 5a6.75 6.75 0 0 1 4.426 1.649A6.75 6.75 0 0 1 22.176 5C25.945 5 29 8.09 29 11.903c0 3.812-3.055 6.903-6.824 6.903a6.75 6.75 0 0 1-4.426-1.65Z"
                    fill="#ED0006"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.75 17.157a6.92 6.92 0 0 0 2.398-5.254 6.92 6.92 0 0 0-2.398-5.254A6.75 6.75 0 0 1 22.176 5C25.945 5 29 8.09 29 11.903c0 3.812-3.055 6.903-6.824 6.903a6.75 6.75 0 0 1-4.426-1.65Z"
                    fill="#F9A000"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.75 6.649a6.92 6.92 0 0 1 2.398 5.254 6.92 6.92 0 0 1-2.398 5.254 6.92 6.92 0 0 1-2.398-5.254 6.92 6.92 0 0 1 2.398-5.254Z"
                    fill="#FF5E00"
                  ></path>
                </svg>
              </span>
              <span data-payment-method="amex" aria-hidden="true">
                <svg
                  width="35"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                    fill="#1F72CD"
                  ></path>
                  <path
                    d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                    stroke="#343233"
                    strokeOpacity=".04"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.681 8.5 3.5 15.747h3.808l.472-1.156h1.08l.472 1.156h4.191v-.882l.374.882h2.168l.374-.9v.9h8.718l1.06-1.126.992 1.126 4.478.01-3.191-3.613 3.19-3.644H27.28l-1.032 1.105-.962-1.105h-9.483l-.815 1.87-.833-1.87h-3.8v.852L9.93 8.5H6.68ZM19.7 9.529h5.006l1.532 1.703 1.58-1.703h1.531l-2.326 2.614 2.326 2.583h-1.6l-1.531-1.722-1.589 1.722h-4.929V9.529Zm1.237 2.026v-.95h3.123l1.363 1.518L24 13.649h-3.063v-1.036h2.73v-1.058h-2.73ZM7.418 9.529h1.856l2.11 4.914V9.53h2.034l1.63 3.523L16.55 9.53h2.023v5.2h-1.231l-.01-4.075-1.795 4.075h-1.102l-1.805-4.075v4.075h-2.532l-.48-1.166H7.023l-.479 1.165H5.187l2.231-5.199Zm.048 2.957.855-2.077.854 2.077H7.466Z"
                    fill="#fff"
                  ></path>
                </svg>
              </span>
              <span data-payment-method="paypal" aria-hidden="true">
                <svg
                  width="35"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                    stroke="#343233"
                    strokeOpacity=".04"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.9 15.241H8.344a.216.216 0 0 0-.213.182l-.63 3.99a.13.13 0 0 0 .129.15h.743a.216.216 0 0 0 .213-.183l.17-1.076a.216.216 0 0 1 .213-.183h.493c1.024 0 1.616-.496 1.77-1.479.07-.43.003-.767-.198-1.004-.221-.26-.613-.397-1.134-.397Zm.18 1.457c-.086.558-.512.558-.924.558H8.92l.164-1.042a.13.13 0 0 1 .129-.11h.107c.281 0 .546 0 .683.16.082.096.107.238.075.434Zm4.47-.018h-.745a.13.13 0 0 0-.128.11l-.033.208-.052-.076c-.161-.234-.52-.312-.88-.312-.823 0-1.526.623-1.663 1.498-.071.436.03.854.277 1.144.227.268.552.38.939.38.663 0 1.03-.427 1.03-.427l-.032.207a.13.13 0 0 0 .127.15h.671a.216.216 0 0 0 .214-.183l.403-2.55a.13.13 0 0 0-.128-.149Zm-1.038 1.45a.83.83 0 0 1-.84.711c-.217 0-.39-.07-.5-.2-.111-.131-.153-.317-.118-.524a.834.834 0 0 1 .835-.717c.211 0 .383.07.497.203.113.134.158.32.126.527Zm4.257-1.45h.749a.13.13 0 0 1 .106.204l-2.49 3.593a.216.216 0 0 1-.178.093h-.747a.13.13 0 0 1-.106-.204l.775-1.095-.824-2.42a.13.13 0 0 1 .123-.171h.735c.096 0 .18.063.208.154l.438 1.462 1.032-1.521a.217.217 0 0 1 .179-.095Z"
                    fill="#253B80"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m25.885 19.412.639-4.062a.13.13 0 0 1 .127-.11h.72c.079 0 .14.072.127.15l-.63 3.99a.216.216 0 0 1-.213.182h-.642a.13.13 0 0 1-.128-.15Zm-4.89-4.171H19.44a.216.216 0 0 0-.213.182l-.63 3.99a.13.13 0 0 0 .128.15h.799a.151.151 0 0 0 .149-.129l.178-1.13a.216.216 0 0 1 .214-.183h.492c1.025 0 1.616-.496 1.77-1.479.07-.43.003-.767-.198-1.004-.22-.26-.613-.397-1.133-.397Zm.18 1.457c-.085.558-.511.558-.924.558h-.234l.165-1.042a.13.13 0 0 1 .127-.11h.108c.28 0 .546 0 .683.16.082.096.106.238.075.434Zm4.47-.018h-.744a.129.129 0 0 0-.128.11l-.033.208-.052-.076c-.161-.234-.52-.312-.88-.312-.823 0-1.526.623-1.663 1.498-.07.436.03.854.277 1.144.228.268.552.38.939.38.663 0 1.03-.427 1.03-.427l-.032.207a.13.13 0 0 0 .128.15h.67a.216.216 0 0 0 .214-.183l.403-2.55a.13.13 0 0 0-.129-.149Zm-1.038 1.45a.83.83 0 0 1-.84.711c-.216 0-.39-.07-.5-.2-.11-.131-.152-.317-.117-.524a.834.834 0 0 1 .834-.717c.212 0 .384.07.497.203a.642.642 0 0 1 .126.527Z"
                    fill="#179BD7"
                  ></path>
                  <path
                    d="m15.657 13.814.19-1.215-.425-.01h-2.034L14.8 3.625a.118.118 0 0 1 .115-.098h3.43c1.139 0 1.925.237 2.335.705.192.22.315.449.374.701.062.265.063.581.003.967l-.005.028v.247l.193.11c.162.085.29.184.39.296.164.188.27.426.315.709.046.29.031.636-.045 1.028-.088.45-.23.843-.421 1.164-.176.296-.401.541-.668.731-.254.181-.556.318-.898.406-.332.086-.71.13-1.124.13h-.267a.81.81 0 0 0-.521.192.808.808 0 0 0-.273.485l-.02.11-.338 2.14-.015.08c-.004.024-.01.037-.021.045a.057.057 0 0 1-.035.013h-1.648Z"
                    fill="#253B80"
                  ></path>
                  <path
                    d="M21.428 5.957c-.01.065-.022.132-.035.2-.453 2.323-2 3.126-3.977 3.126H16.41a.489.489 0 0 0-.483.413l-.515 3.268-.146.926a.257.257 0 0 0 .254.298h1.785a.43.43 0 0 0 .424-.362l.018-.09.336-2.133.021-.117a.429.429 0 0 1 .424-.363h.267c1.73 0 3.083-.702 3.48-2.734.164-.849.079-1.557-.359-2.056a1.705 1.705 0 0 0-.488-.376Z"
                    fill="#179BD7"
                  ></path>
                  <path
                    d="M20.954 5.768a3.571 3.571 0 0 0-.44-.097 5.59 5.59 0 0 0-.887-.065H16.94a.427.427 0 0 0-.424.363l-.572 3.622-.016.106a.489.489 0 0 1 .483-.414h1.006c1.977 0 3.524-.803 3.977-3.125l.035-.201a2.408 2.408 0 0 0-.474-.189Z"
                    fill="#222D65"
                  ></path>
                  <path
                    d="M16.516 5.968a.428.428 0 0 1 .423-.362h2.689c.318 0 .616.02.887.065a4.065 4.065 0 0 1 .44.097l.102.032c.133.044.257.096.371.157.135-.858 0-1.443-.465-1.972-.511-.582-1.435-.832-2.616-.832h-3.43a.49.49 0 0 0-.485.414l-1.428 9.056c-.028.18.11.341.29.341h2.118l.532-3.373.572-3.623Z"
                    fill="#253B80"
                  ></path>
                </svg>
              </span>
            </div>
            <Divider className="w-full" orientation="horizontal" />
            <Button type="submit" radius="sm" className="w-full">
              Checkout
            </Button>
          </span>)}
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
  const router = useRouter();

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartItems(cartItemsFromStorage);
    setIsRefetch(false);
  }, [counter]);

  useEffect(() => {
    if (isLoggedIn && Array.isArray(serverCartData)) {
      const serverCartItems = serverCartData.map((item: any) => ({
        id: item.product,
        variantId: item.variant,
      }));

      const localStorageCartItems = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const itemsToPost: CartItem[] = localStorageCartItems.filter(
        (localItem: CartItem) =>
          !serverCartItems.some(
            (serverItem: CartItem) =>
              serverItem.id === localItem.id &&
              serverItem.variantId === localItem.variantId
          )
      );
      if (itemsToPost.length > 0) {
        postCartItem({ items: itemsToPost });
      }

      const newLocalStorageCartItems: CartItem[] = [...localStorageCartItems];
      console.log("localstorage current data", newLocalStorageCartItems);
      serverCartItems.forEach((serverItem: CartItem) => {
        if (
          !newLocalStorageCartItems.some(
            (localItem: CartItem) =>
              localItem.id === serverItem.id &&
              localItem.variantId === serverItem.variantId
          )
        ) {
          newLocalStorageCartItems.push(serverItem);
        }
      });
      console.log(
        "after filter new local storage data need to be",
        newLocalStorageCartItems
      );
      // Update local storage and state
      localStorage.setItem("cart", JSON.stringify(newLocalStorageCartItems));
    }
  }, [isLoggedIn, serverCartData, postCartItem]);

  const productIds = useMemo(
    () => cartItems.map((item) => item.id),
    [cartItems]
  );

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
          const price = getVariantData(
            product.variants || null,
            "price",
            cartItem.variantId
          );
          if (price) {
            const { convertedPrice, symbol: convertedSymbol } =
              convertPrice(price);
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
    <div
      data-lenis-prevent
      className="flex flex-col gap-4 py-5 max-h-[62vh] h-[62vh] overflow-y-auto overflow-hidden mt-3"
    >
      {isLoading ? (
        <Spinner color="default" />
      ) : (
        <>
          {counter > 0 ? (
            <>
              <h1 className="text-xl">
                Your cart total is {totalPriceData.currencySymbol}{" "}
                {totalPriceData.totalPrice}
              </h1>
              {products.map((product, index) => {
                const cartItem = cartItems.find(
                  (item) => item.id === product.id
                );
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
                      {totalPriceData.currencySymbol}{" "}
                      {totalPriceData.totalPrice}
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
                      {totalPriceData.currencySymbol}{" "}
                      {totalPriceData.totalPrice}
                    </p>
                  </span>
                </CardBody>
              </Card>
            </>
          ) : (
            <div className="w-full h-full min-h-[70vh] flex items-center justify-center flex-col gap-2">
              <span className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Your cart is currently empty</h1>
                <p className="text-md text-zinc-500">
                  Add products to your cart
                </p>
              </span>
              <SheetClose asChild>
                <Button
                  className=" text-white"
                  onClick={() => router.push("/collections")}
                >
                  Shop Now
                </Button>
              </SheetClose>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CartItem: React.FC<LinkProps> = ({
  data,
  variantId,
  setSelectedIndicator,
  refetch,
}) => {
  const { images, product_name, categoryname, variants, id } = data;
  const { isLoggedIn, convertPrice } = useAuth();
  const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(
    null
  );
  const { counter, setCounter } = useCart();
  const [deleteCartItem] = useCartDeleteMutation();

  useEffect(() => {
    if (variants) {
      setVariantsData(variants);
    }
  }, [variants]);

  const variantPrice = useMemo(
    () => getVariantData(variantsdata, "price", variantId),
    [variantsdata, variantId]
  );
  const { convertedPrice, symbol } = useMemo(
    () => convertPrice(variantPrice),
    [convertPrice, variantPrice]
  );

  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );

  const handleDelete = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const response = await deleteCartItem({ id }).unwrap();
        if (response && response.msg === "Item removed from cart") {
          const cartItemsFromStorage = JSON.parse(
            localStorage.getItem("cart") || "[]"
          );
          const updatedCartItems = cartItemsFromStorage.filter(
            (item: CartItem) =>
              !(item.id === id && item.variantId === variantId)
          );

          localStorage.setItem("cart", JSON.stringify(updatedCartItems));
          setCounter(counter - 1);
          refetch(true);
        }
      } else {
        const cartItemsFromStorage = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
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
            <span className="flex items-center gap-5">
              <Button
                isIconOnly
                color="secondary"
                aria-label="Like"
                onClick={handleDelete}
                className="max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
              >
                <AiFillDelete color="#ffffffd6" size={15} />
              </Button>
              <p className="text-sm">1</p>
              <Button
                isIconOnly
                variant="bordered"
                aria-label="Like"
                className="max-h-[25px] max-w-[25px] min-w-[25px] rounded-lg p-0"
              >
                <IoIosAdd color="#ffffffd6" size={22} />
              </Button>
            </span>
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
