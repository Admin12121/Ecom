"use client";

import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useGetshippingQuery } from "@/lib/store/Service/api";
import Shipping from "./shipping";

interface AddressItem {
  id: number;
  address: string;
  country: string;
  city: string;
  zipcode: string;
  default: boolean;
  user: number;
}

const Address = ({
  accessToken,
  shipping,
  dispatch,
}: {
  accessToken?: string;
  shipping: string;
  dispatch: any;
}) => {
  const { data: Address, isLoading, refetch } = useGetshippingQuery(
    { token: accessToken },
    { skip: !accessToken }
  );

  useEffect(() => {
    if (Address?.results) {
      const defaultAddress = Address.results.find(
        (addr: AddressItem) => addr.default
      );
      if (defaultAddress) {
        dispatch({
          type: "SET_SHIPPING",
          payload: defaultAddress.id.toString(),
        });
      } else if (Address.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * Address.results.length);
        dispatch({
          type: "SET_SHIPPING",
          payload: Address.results[randomIndex].id.toString(),
        });
      }
    }
  }, [Address]);

  if (!shipping) {
    return (
      <div className="text-left hover:no-underline pl-2 py-3 lg:min-w-[450px] space-y-2 rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all ">
        <h1 className="flex gap-1 items-center font-normal"> <MapPin className="w-4 h-4"/> Add Shipping Address</h1>
        <Shipping refetch={refetch} accessToken={accessToken} />
      </div>
    );
  }

  return (
    <>
      <Accordion type="single" collapsible className="space-y-1">
        <AccordionItem
          value={`address`}
          className="rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all "
        >
          <AccordionTrigger
            icon={<ChevronDown className="w-4 h-4" />}
            className="text-left hover:no-underline pl-2 py-3 lg:min-w-[450px]"
          >
            <Skeleton loading={isLoading}>
              {shipping && (
                <span className="flex flex-col">
                  <p className="">
                    {
                      Address.results.find(
                        (addr: any) => addr.id.toString() === shipping
                      )?.address
                    }
                  </p>
                  <p className="text-zinc-500">
                    {
                      Address.results.find(
                        (addr: any) => addr.id.toString() === shipping
                      )?.zipcode
                    }
                    ,{" "}
                    {
                      Address.results.find(
                        (addr: any) => addr.id.toString() === shipping
                      )?.city
                    }
                    ,{" "}
                    {
                      Address.results.find(
                        (addr: any) => addr.id.toString() === shipping
                      )?.country
                    }
                  </p>
                </span>
              )}
            </Skeleton>
          </AccordionTrigger>
          <AccordionContent>
            <fieldset className="space-y-4">
              <legend className="text-sm font-medium leading-none text-foreground">
                Select shipping address
              </legend>
              <RadioGroup
                className="gap-0 -space-y-px rounded-lg shadow-sm shadow-black/5"
                value={shipping}
                onValueChange={(value) =>
                  dispatch({ type: "SET_SHIPPING", payload: value })
                }
              >
                {Address?.results &&
                  Address.results.length > 0 &&
                  Address.results.map((item: AddressItem) => (
                    <div
                      key={item.id}
                      className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-green-400/50 has-[[data-state=checked]]:bg-green-600/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            id={item.id.toString()}
                            value={item.id.toString()}
                            className="after:absolute after:inset-0"
                            aria-describedby={`${item.id}-price`}
                          />
                          <Label
                            className="inline-flex items-start flex-col gap-1 ml-4"
                            htmlFor={item.id.toString()}
                          >
                            <span>
                              {item.address}
                              {item.default && (
                                <span className="-mt-1 ml-2 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-300/15 px-1 py-0.5 text-[10px] font-medium uppercase text-emerald-600">
                                  Default
                                </span>
                              )}
                            </span>
                            <p className="text-zinc-500 text-xs">
                              {item.zipcode}, {item.city}, {item.country}
                            </p>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent">
                  <Shipping refetch={refetch} accessToken={accessToken} />
                </div>
              </RadioGroup>
            </fieldset>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

const Skeleton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    return (
      <div className="w-full gap-1 flex flex-col h-10">
        <span className="w-[100px] rounded-md h-5 bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        <span className="w-[200px] rounded-md h-5 bg-neutral-800/10 dark:bg-neutral-100/10"></span>
      </div>
    );
  }
  return <>{children}</>;
};

export default Address;
