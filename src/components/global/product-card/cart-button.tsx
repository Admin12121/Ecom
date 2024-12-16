import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AddToCart from "../add-to-cart";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent as CardBody } from "@/components/ui/card";
import { Separator as Divider } from "@/components/ui/separator";
import { VariantObject } from "@/types/product";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  useNotifyuserMutation,
  useGetnotifyuserQuery,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { delay } from "@/lib/utils";

const EmailSchema = z.object({
  email: z.string().min(1, { message: "UID is required" }),
});

interface CartbuttonProps {
  data: number;
  stocks: number;
  variantsData: VariantObject | VariantObject[];
  selectedSize?: any;
  setSelectedSize?: any;
  finalPrice: any;
  convertedPrice: any;
  symbol: any;
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

const Cartbutton = ({
  data,
  stocks,
  variantsData,
  convertedPrice,
  symbol,
  selectedSize,
  setSelectedSize,
  finalPrice,
}: CartbuttonProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    if (display) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [display]);

  const sortedVariants = Array.isArray(variantsData)
    ? [...variantsData].sort((a, b) => Number(a.size) - Number(b.size))
    : [];

  return (
    <>
      {Array.isArray(variantsData) || stocks === 0 ? (
        <Button
          variant="active"
          size="sm"
          className={cn(
            "h-[30px] flex justify-center items-center text-sm gap-2",
            stocks === 0 && Array.isArray(variantsData) && "shadow-none"
          )}
          onClick={() => setDisplay(true)}
        >
          {stocks === 0 && !Array.isArray(variantsData) ? (
            "Notify me"
          ) : (
            <>
              <ShoppingBag className="w-3 h-3" />
              Add
            </>
          )}
        </Button>
      ) : (
        <AddToCart product={data} variant={selectedSize.id} />
      )}
      <motion.div
        ref={ref}
        initial={{ bottom: "-500px" }}
        animate={{ bottom: display ? "0px" : "-500px" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          ease: "easeInOut",
        }}
        {...{className:cn(
          "absolute z-10 w-full left-0  max-h-52 rounded-lg backdrop-blur bg-zinc-200/60 dark:bg-[#121212db] p-2"
        )}}
      >
        {Array.isArray(variantsData) ? (
          <>
            <span className="flex gap-3 flex-col">
              <p className="text-sm">Choose Statue Size</p>
              <span className="flex gap-2 items-center">
                {sortedVariants.map((variant, index) => (
                  <Button
                    key={variant.id}
                    variant={
                      selectedSize?.id === variant.id ? "active" : "secondary"
                    }
                    size="sm"
                    onClick={() =>
                      setSelectedSize({
                        id: variant.id,
                        size: variant.size,
                        price: variant.price,
                        discount: variant.discount,
                      })
                    }
                  >
                    {getSizeCategory(index)}
                  </Button>
                ))}
              </span>
            </span>
            {stocks === 0 ? (
              <NotifyForm
                product={data}
                selectedVariant={selectedSize.id}
                stock={stocks}
                display={display}
                setDisplay={setDisplay}
              />
            ) : (
              <Card className="w-full mt-5 rounded-md bg-white dark:bg-neutral-900 border-none shadow-none p-3">
                <CardBody>
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">Statue Size</p>
                    <p className="text-xs text-zinc-400">
                      {selectedSize?.size} cm
                    </p>
                  </span>
                  <Divider className="my-1" />
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">Price</p>
                    <span className="flex gap-2">
                      <p className="text-sm">
                        {selectedSize &&
                          selectedSize?.discount > 0 &&
                          `${symbol} ${finalPrice}`}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          selectedSize &&
                            selectedSize?.discount > 0 &&
                            "text-neutral-500 line-through"
                        )}
                      >
                        {symbol} {convertedPrice}
                      </p>
                    </span>
                  </span>
                </CardBody>
              </Card>
            )}
            {selectedSize?.id && <AddToCart
              className="w-full mt-2"
              product={data}
              variant={selectedSize?.id}
            />}
          </>
        ) : (
          <NotifyForm
            product={data}
            selectedVariant={selectedSize.id}
            stock={stocks}
            display={display}
            setDisplay={setDisplay}
          />
        )}
      </motion.div>
    </>
  );
};

interface NotifyFormProps {
  product: number;
  selectedVariant: number;
  display: boolean;
  stock: number;
  setDisplay:any;
}

const NotifyForm = ({
  product,
  selectedVariant,
  display,
  stock,
  setDisplay,
}: NotifyFormProps) => {
  const { accessToken } = useAuthUser();
  const [notifyuser,{isLoading}] = useNotifyuserMutation();
  const [notifyadded, setNotifyAdded] = useState<boolean>(false);
  const { data: Notify, isLoading:loading } = useGetnotifyuserQuery(
    { product: product, variant: selectedVariant, token: accessToken },
    { skip: !product || !selectedVariant || stock !== 0 || !display }
  );
  useEffect(() => {
    setNotifyAdded(Notify?.requested || false);
  }, [Notify]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(EmailSchema),
  });

  const emailValue = watch("email", "");

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Adding to waiting list...", {
      position: "top-center",
    });
    const actualData = {
      ...data,
      variant: selectedVariant,
      product: product,
    };
    await delay(500);
    const res = await notifyuser({actualData, token:accessToken});
    if(res.data){
      setDisplay(false)
      toast.success("Added to waiting list", {
        id: toastId,
        position: "top-center",
      });
    }
    if (res.error) {
      toast.error("Something went wrong, try again later", {
        id: toastId,
        position: "top-center",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-2 py-1 h-full justify-end"
    >
      <span>
        <h1 className="text-xl font-medium text-neutral-600 dark:text-zinc-300">
          This item is out of stock!
        </h1>
      </span>
      <Input
        {...register("email")}
        type="email"
        placeholder={notifyadded ? "You will be notify soon!!" : "Enter your email"}
        className={cn("dark:bg-custom/40 border-0 bg-white outline-none focus:ring-0 focus:border-transparent", notifyadded && "border-ring ring-2 ring-orange-400/50 ring-offset-2")}
        disabled={notifyadded}
      />
      <Button
        color="default"
        variant="custom"
        className={cn("w-full h-[40px] text-base disabled:cursor-not-allowed")}
        type="submit"
        disabled={notifyadded || !emailValue || !!errors.email}
        loading={isLoading}
      >
        Notify me when available
      </Button>
    </form>
  );
};

export default Cartbutton;
