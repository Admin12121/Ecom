"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ReviewSheet } from "./review-sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator as Divider } from "@/components/ui/separator";
import {
  Card,
  CardContent as CardBody,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Box as FiBox,
  Star as MdOutlineStar,
  OctagonAlert as PiWarningOctagon,
} from "lucide-react";

import {
  useNotifyuserMutation,
  useGetnotifyuserQuery,
} from "@/lib/store/Service/User_Auth_Api";
import { authUser } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";
import StockWarningMessage from "./stock-warning";
import WishList from "@/components/global/wishlist-button";
import { encryptproduct } from "@/lib/transition";

const EmailSchema = z.object({
  email: z.string().min(1, { message: "UID is required" }),
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

export const getSizeCategory = (index: number) => {
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
  const { status } = authUser();
  const { convertPrice } = useAuth();
  const { updateProductList } = useCart();
  const [notifyuser] = useNotifyuserMutation();

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
  const [notifyadded, setNotifyAdded] = useState<boolean>(false);

  const { data, isLoading, refetch } = useGetnotifyuserQuery(
    { product: products, variant: selectedVariant },
    { skip: !products || !selectedVariant || selectedVariantOutOfStock }
  );

  useEffect(() => {
    setNotifyAdded(data?.requested || false);
  }, [data]);

  const handleDrawer = () => {};

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
      if (sortedVariants.length > 0) {
        setSelectedSize({
          id: sortedVariants[0].id,
          size: sortedVariants[0].size,
        });
      }
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

  const getVariantData = useCallback(
    (
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
    },
    [variantsData]
  );

  const { convertedPrice, symbol } = convertPrice(
    getVariantData(variantsData, "price", selectedSize?.id)
  );

  const discount = getVariantData(variantsData, "discount", selectedSize?.id);
  const stock = getVariantData(variantsData, "stock", selectedSize?.id);
  const finalPrice = useMemo(() => {
    return convertedPrice - convertedPrice * (discount / 100);
  }, [convertedPrice, discount]);

  const handleRoute = () => {
    router.push(`/collections?category=${products?.categoryname}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(EmailSchema),
  });

  const emailValue = watch("email", "");

  const onSubmit = async (data: any) => {
    const actualData = {
      ...data,
      variant: selectedVariant,
      product: products.id,
    };
    const res = await notifyuser(actualData);
    if (res.error) {
      toast.error("Something went wrong, try again later");
    }
  };

  const handleAddToCart = () =>
    updateProductList({
      product: products.id,
      variant: getVariantData(variantsData, "id", selectedSize?.id),
    });

  const handleenc = async () => {
    if (status) {
      const data = [
        {
          id: products?.id,
          variantId: getVariantData(variantsData, "id", selectedSize?.id),
          pcs: 1,
        },
      ];
      await encryptproduct(data, router);
    } else {
      router.push(`/login`);
    }
  };
  return (
    <>
      <aside className="sidebar  w-full sticky top-[65px] space-y-8 ">
        {outOfStock && !selectedVariantOutOfStock && (
          <StockWarningMessage message="Some items are out of stock" />
        )}
        {selectedVariantOutOfStock && (
          <StockWarningMessage message="This item is out of stock" />
        )}
        {stock > 0 && stock < 5 && (
          <StockWarningMessage message="Few items left in stock!" />
        )}

        <Card className=" w-full bg-transparent border-none border-0 shadow-none p-0 pt-3">
          <CardHeader className="flex flex-row gap-3 justify-between items-center px-4">
            <div className="flex gap-3 items-center">
              <div className="flex flex-col">
                <p className="text-2xl font-medium">{products?.product_name}</p>
                <p
                  className="text-sm text-neutral-600 cursor-pointer"
                  onClick={handleRoute}
                >
                  {products?.categoryname}
                </p>
              </div>
            </div>
            <WishList productId={products.id} />
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
                          setSelectedSize({
                            id: variant.id,
                            size: variant.size,
                          })
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
            {stock > 0 && stock < 5 && (
              <span className="flex items-center gap-2 text-sm font-extralight">
                <PiWarningOctagon className="w-4 h-4" /> {stock} items left
              </span>
            )}
            <span className="w-full flex gap-5 items-center">
              <span className="text-xs text-zinc-400 flex gap-2">
                <FiBox size={16} /> Delivery on July 18th - 25th
              </span>
            </span>
            <span className="w-full flex gap-3 items-center">
              <span className="flex gap-2">
                <p className="text-lg">
                  {discount > 0 && `${symbol} ${finalPrice}`}
                </p>
                <p
                  className={cn(
                    "text-lg",
                    discount > 0 && "text-neutral-500 line-through"
                  )}
                >
                  {symbol} {convertedPrice}
                </p>
              </span>
            </span>
            {!selectedVariantOutOfStock ? (
              <span className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full h-[40px] text-base"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                {status && (
                  <Button
                    variant="active"
                    className="w-full h-[40px] text-base"
                    onClick={handleenc}
                  >
                    Buy now
                  </Button>
                )}
              </span>
            ) : isLoading ? (
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
                />
                <span className="flex gap-2">
                  <Button
                    color="default"
                    variant="custom"
                    className="w-full h-[40px] text-base"
                    type="submit"
                    disabled={notifyadded || !emailValue || !!errors.email}
                  >
                    Notify me when available
                  </Button>
                  <WishList productId={products.id} custom={false} />
                </span>
              </form>
            )}
          </CardBody>
          <CardFooter className="gap-5 flex flex-col pb-0">
            <span className="w-full p-0">
              <Card className="w-full border-none border-0 bg-white dark:bg-neutral-950 p-0">
                <CardHeader className="flex gap-3 p-3">
                  <div className="w-full flex justify-between items-center px-1">
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
                  <ReviewSheet
                    rating={products.rating}
                    slug={products.productslug}
                  />
                </CardBody>
              </Card>
            </span>
          </CardFooter>
        </Card>
      </aside>
    </>
  );
};

export default Sidebar;
