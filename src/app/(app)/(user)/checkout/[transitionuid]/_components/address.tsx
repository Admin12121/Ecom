"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  useGetshippingQuery,
} from "@/lib/store/Service/api";
import { Button } from "@/components/ui/button";
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

const Address = ({ accessToken }: { accessToken?: string }) => {
  const { data: Address, isLoading: AddressLoading } = useGetshippingQuery(
    { token: accessToken },
    { skip: !accessToken }
  );

  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (Address?.results) {
      const defaultAddress = Address.results.find(
        (addr: AddressItem) => addr.default
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id.toString());
      } else if (Address.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * Address.results.length);
        setSelectedAddress(Address.results[randomIndex].id.toString());
      }
    }
  }, [Address]);

  return (
    <>
      <h1>Shipping Address</h1>
      <Accordion type="single" collapsible className="space-y-1">
        <AccordionItem
          value={`address`}
          className="rounded-lg shadow-none bg-white dark:bg-neutral-900 px-2 transition-all "
        >
          <AccordionTrigger
            icon={<ChevronDown className="w-4 h-4" />}
            className="text-left hover:no-underline pl-2 py-3 lg:min-w-[450px]"
          >
            {selectedAddress && (
              <span className="flex flex-col">
                <p className="text-zinc-500">
                  {
                    Address.results.find(
                      (addr: any) => addr.id.toString() === selectedAddress
                    )?.address
                  }
                </p>
                <p className="text-zinc-500">
                  {
                    Address.results.find(
                      (addr: any) => addr.id.toString() === selectedAddress
                    )?.zipcode
                  }
                  ,{" "}
                  {
                    Address.results.find(
                      (addr: any) => addr.id.toString() === selectedAddress
                    )?.city
                  }
                  ,{" "}
                  {
                    Address.results.find(
                      (addr: any) => addr.id.toString() === selectedAddress
                    )?.country
                  }
                </p>
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <fieldset className="space-y-4">
              <legend className="text-sm font-medium leading-none text-foreground">
                Select shipping address
              </legend>
              <RadioGroup
                className="gap-0 -space-y-px rounded-lg shadow-sm shadow-black/5"
                value={selectedAddress}
                onValueChange={setSelectedAddress}
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
                  <Shipping accessToken={accessToken}/>
                </div>
              </RadioGroup>
            </fieldset>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Address;
