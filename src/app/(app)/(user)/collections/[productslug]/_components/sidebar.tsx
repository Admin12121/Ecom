"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent as CardBody,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Input } from "@/components/ui/input";
import { Badge as Chip } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Separator as Divider } from "@/components/ui/separator";
import {
  Box as FiBox,
  Star as MdOutlineStar,
  OctagonAlert as PiWarningOctagon,
  Heart as IoIosHeartEmpty,
} from "lucide-react";

import { useAuth } from "@/lib/context";
import { useRouter } from "next/navigation";

import {
  useNotifyuserMutation,
  useGetnotifyuserQuery,
} from "@/lib/store/Service/User_Auth_Api";

import { useForm } from "react-hook-form";

import { toast } from "sonner";
import dynamic from "next/dynamic";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// const WriteReview = dynamic(()=> import('./drawer'), {ssr: false})
// const Review = dynamic(()=> import('./review'), {ssr: false})

const PasswordSchema = z.object({
  uid: z.string().min(1, { message: "UID is required" }),
  token: z.string().min(1, { message: "Token is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

interface VariantObject {
  id: number;
  product_stripe_id: string | null;
  size: string | null;
  price: string;
  discount: string;
  stock: number;
  product: number;
}

interface Product {
  id: number;
  categoryname: string;
  subcategoryname: string;
  comments: any[];
  rating: number;
  total_ratings: number;
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: any[];
}

const getSizeCategory = (index: number) => {
  const sizeNames = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "XXX-Large",
  ];
  return sizeNames[index] || `Size-${index + 1}`;
};

const Sidebar = ({ products }: { products: Product }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<{
    id: number;
    size: string | null;
  } | null>(null);
  const [variantsData, setVariantsData] = useState<
    VariantObject[] | VariantObject | null
  >(null);
  const [selectedVariantOutOfStock, setSelectedVariantOutOfStock] =
    useState<boolean>(false);
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const { convertPrice } = useAuth();
  const [notifyuser] = useNotifyuserMutation();
  const [notifyadded, setNotifyAdded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  //   const WriteReview = dynamic(
  //     () => (isSheetOpen ? import("./drawer") : Promise.resolve(() => null)),
  //     { ssr: false }
  //   );
  //   const Review = dynamic(
  //     () => (isOpen ? import("./review") : Promise.resolve(() => null)),
  //     { ssr: false }
  //   );

  const handleDrawer = () => {
    // to do
    // if (isLoggedIn) {
    //   setIsSheetOpen(true);
    // } else {
    //   router.push("/login");
    // }
  };

  const handleSizeClick = (id: number, size: string | null) => {
    setSelectedSize({ id, size });
  };

  const sortedVariants = Array.isArray(variantsData)
    ? [...variantsData].sort((a, b) => Number(a.size) - Number(b.size))
    : [];

  useEffect(() => {
    if (products?.variants) {
      setVariantsData(products.variants);
      if (!Array.isArray(products.variants)) {
        setSelectedSize({
          id: products.variants.id,
          size: products.variants.size,
        });
      }
    }
  }, [products]);

  useEffect(() => {
    if (products?.variants && Array.isArray(products.variants)) {
      const variants = products.variants;
      const sortedVariants = [...variants].sort(
        (a, b) => Number(a.size) - Number(b.size)
      );
      setVariantsData(sortedVariants);

      // Set initial selected size
      if (sortedVariants.length > 0) {
        setSelectedSize({
          id: sortedVariants[0].id,
          size: sortedVariants[0].size,
        });
      }

      // Check if any variant is out of stock
      const anyOutOfStock = sortedVariants.some(
        (variant) => variant.stock === 0
      );
      setOutOfStock(anyOutOfStock);
    }
  }, [products]);

  useEffect(() => {
    if (selectedSize) {
      if (Array.isArray(variantsData)) {
        const selectedVariant = variantsData.find(
          (variant) => variant.id === selectedSize.id
        );
        setSelectedVariantOutOfStock(
          selectedVariant ? selectedVariant.stock === 0 : false
        );
        if (selectedVariant) {
          setSelectedVariant(selectedVariant.id);
        }
      } else if (variantsData) {
        setSelectedVariantOutOfStock(variantsData.stock === 0);
      }
    }
  }, [selectedSize, variantsData]);

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      const variant = variantsData.find((variant) => variant.id === index);
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };

  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price", selectedSize?.id)
  );

  const handleRoute = () => {
    router.push(`/collections?category=${products?.categoryname}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const actualData = {
      ...data,
      variant: selectedVariant,
      product: products.id,
    };
    const res = await notifyuser(actualData);
    if (res.data) {
    } else if (res.error) {
      toast.error("Some Thing went wrong, try again later");
    }
  };

  return (
    <>
      <aside className="sidebar py-6 w-full sticky top-[65px] space-y-8 ">
        {outOfStock && !selectedVariantOutOfStock && (
          <span className="w-full flex justify-center items-center px-2">
            <Code className=" w-full text-base flex items-center justify-center flex-row bg-white dark:bg-neutral-950 rounded-md h-[50px]">
              <p className="flex items-center justify-center flex-row gap-2 text-orange-500">
                <PiWarningOctagon size={18} /> Some items are out of stock
              </p>
            </Code>
          </span>
        )}
        {selectedVariantOutOfStock && (
          <span className="w-full flex justify-center items-center px-2">
            <Code className=" w-full text-base flex items-center justify-center flex-row bg-white dark:bg-neutral-950 rounded-md h-[50px]">
              <p className="flex items-center justify-center flex-row gap-2 text-orange-500">
                <PiWarningOctagon size={18} /> This item is out of stock
              </p>
            </Code>
          </span>
        )}
        <Card className=" w-full bg-transparent border-none border-0 shadow-none">
          <CardHeader className="flex flex-row gap-3 justify-between px-4">
            <div className="flex gap-3 items-center">
              <div className="flex flex-col">
                <p className="text-2xl font-medium">{products?.product_name}</p>
                <p
                  className="text-sm text-slate-500 cursor-pointer"
                  onClick={handleRoute}
                >
                  {products?.categoryname}
                </p>
              </div>
            </div>
            <div className="text-foreground/50 flex gap-2 items-center">
              <span className="h-full flex text-xs items-center justify-center cursor-pointer">
                <IoIosHeartEmpty size={22} color="#fff" />
              </span>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col p-4 gap-5 flex-initial ">
            {Array.isArray(variantsData) && (
              <>
                <span className="flex gap-3 flex-col">
                  <p className="text-sm">Statue Size</p>
                  <span className="flex gap-2 items-center">
                    {sortedVariants.map((variant, index) => (
                      <Button
                        key={variant.id}
                        variant={
                          selectedSize?.id === variant.id
                            ? "active"
                            : "secondary"
                        }
                        size="sm"
                        onClick={() =>
                          handleSizeClick(variant.id, variant.size)
                        }
                      >
                        {getSizeCategory(index)}
                      </Button>
                    ))}
                  </span>
                </span>
                <Card className="w-full mt-5 rounded-md bg-white dark:bg-neutral-900 border-none shadow-none p-3">
                  <CardBody>
                    <p className="text-sm text-zinc-400">Size</p>
                    <Divider className="my-1" />
                    <span className="flex justify-between items-center">
                      <p className="text-xs text-zinc-400">Statue Size</p>
                      <p className="text-xs text-zinc-400">
                        {selectedSize?.size} cm
                      </p>
                    </span>
                  </CardBody>
                </Card>
              </>
            )}
            <span className="w-full flex gap-5 items-center">
              <span className="text-xs text-zinc-400 flex gap-2">
                <FiBox size={16} /> Delivery on July 18th - 25th
              </span>
            </span>
            <span className="w-full flex gap-3 items-center">
              <span className="text-lg">
                {symbol} {convertedPrice}
              </span>
              <Chip className="text-xs bg-neutral-900 rounded-md text-orange-500">
                $48 with 50% off
              </Chip>
            </span>
            {selectedVariantOutOfStock && (
              <Notify
                selectedVariant={selectedVariant}
                products={products.id}
                setLoading={setLoading}
                setNotifyAdded={setNotifyAdded}
              />
            )}
            {!selectedVariantOutOfStock ? (
              <span className="flex gap-3">
                <Button
                  color="custom"
                  //   variant={`${isLoggedIn ? "flat" : "shadow"}`}
                  //   radius="sm"
                  variant="custom"
                  size="sm"
                  className="w-full h-[40px] text-base"
                >
                  Add to Cart
                </Button>
                {/* {isLoggedIn && (
                  <Button
                    color="secondary"
                    variant="shadow"
                    radius="sm"
                    size="sm"
                    className="w-full h-[40px] text-base"
                  >
                    Buy now
                  </Button>
                )} */}
              </span>
            ) : loading ? (
              <span className="flex w-full h-[185px] items-center justify-center">
                <Spinner color="default" />
              </span>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-2 py-5"
              >
                <span>
                  <h1 className="text-xl font-medium text-neutral-600 dark:text-zinc-300">
                    This item is out of stock!
                  </h1>
                  <p className="text-sm text-zinc-400">
                    Enter your email and we&apos;ll notify you when it&apos;s
                    back in stock
                  </p>
                </span>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="dark:bg-custom/40 border-0 bg-white outline-none focus:ring-0 focus:border-transparent"
                  disabled={notifyadded}
                  // errorMessage={errors?.email?.message}
                />
                <span className="flex gap-2">
                  <Button
                    color="default"
                    variant="custom"
                    className="w-full h-[40px] text-base"
                    type="submit"
                    disabled={notifyadded}
                  >
                    Notify me when available
                  </Button>
                  <Button
                    variant="custom"
                    asChild
                    className="h-[40px] w-[40px] p-2 cursor-pointer"
                  >
                    <IoIosHeartEmpty className="w-9 h-9" color="#fff" />
                  </Button>
                </span>
              </form>
            )}
          </CardBody>
          <CardFooter className="gap-5 flex flex-col pb-0">
            {/* <Accordion variant="splitted" isCompact itemClasses={itemClasses}>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="🟠 Composition"
                // className="h-[40px] py-0 rounded-md"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="📏 Size & Weight"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion> */}
            <span className="w-full px-2">
              <Card className="w-full border-none border-0 bg-white dark:bg-neutral-950">
                <CardHeader className="flex gap-3 p-3">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-md">Reviews({products.total_ratings})</p>
                    <span
                      onClick={() => handleDrawer()}
                      className="cursor-pointer hover:text-zinc-600 transition text-small text-default-500"
                    >
                      Write a Review
                    </span>
                  </div>
                </CardHeader>
                <CardBody className="gap-3 p-3 flex flex-col">
                  <div className="w-full flex justify-between items-center px-1">
                    <p className="text-xs">Overall rating</p>
                    <p className="text-xs flex gap-1 items-center">
                      {products.rating}{" "}
                      <MdOutlineStar color="orange" size={16} />
                    </p>
                  </div>
                  <Button
                    color="default"
                    variant="custom"
                    className="w-full h-[40px] text-base"
                    // radius="sm"
                    // variant="flat"
                    onClick={() => {
                      // onOpen();
                    }}
                  >
                    Show all
                  </Button>
                </CardBody>
              </Card>
            </span>
          </CardFooter>
        </Card>
        {/* {products?.productslug && (
          <Review
            rating={products.rating}
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            slug={products.productslug}
            onSheetOpen={handleDrawer}
          />
        )} */}
      </aside>
      {/* <WriteReview
        product={products}
        price={`${symbol} ${convertedPrice}`}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      /> */}
    </>
  );
};

const Notify = ({
  products,
  selectedVariant,
  setNotifyAdded,
  setLoading,
}: {
  products: number;
  selectedVariant: number | null;
  setNotifyAdded: any;
  setLoading: any;
}) => {
  const product = products;
  const variant = selectedVariant;
  const { data, isLoading, refetch } = useGetnotifyuserQuery({
    product,
    variant,
  });
  if (data && data.requested) {
    setNotifyAdded(true);
  } else {
    setNotifyAdded(false);
  }
  setLoading(isLoading);
  return <></>;
};
export default Sidebar;
