import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Price from "./slider";
import { useAuth } from "@/lib/context";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toPascalCase } from "@/lib/utils";

interface Item {
  id: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

interface Color {
  id: string;
  name: string;
  color: string;
}

const metal: Item[] = [
  { id: "radio-13-r1", value: "gold", label: "Gold" },
  { id: "radio-13-r2", value: "silver", label: "Silver" },
  { id: "radio-13-r3", value: "brass", label: "Brass" },
  { id: "radio-13-r6", value: "copper", label: "Copper" },
];

const color: Item[] = [
  { id: "radio-13-r1", value: "gold", label: "Gold" },
  { id: "radio-13-r3", value: "blue", label: "Blue" },
  { id: "radio-13-r6", value: "white", label: "White" },
];

const size: Item[] = [
  { id: "radio-13-r1", value: "mini", label: "Mini" },
  { id: "radio-13-r3", value: "small", label: "Small" },
  { id: "radio-13-r6", value: "medium", label: "Medium" },
  { id: "radio-13-r7", value: "large", label: "Large" },
];

const availability: Item[] = [
  { id: "radio-13-r1", value: "in", label: "In stock" },
  { id: "radio-13-r3", value: "out", label: "Out of Stock" },
];

const Sidebar = ({
  state,
  dispatch,
  handleClose,
  materials,
}: {
  state: any;
  dispatch: any;
  handleClose: any;
  materials: any;
}) => {
  const { selectedcurrency } = useAuth();
  const items = [
    {
      id: "1",
      title: "Metal",
      content: (
        <fieldset className="space-y-4">
          <div className="grid grid-cols-3 p-1 gap-3">
            {materials.metals.map((item:any) => (
              <label
                key={Math.random()}
                className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors text-foreground has-[[data-state=checked]]:text-white has-[[data-disabled]]:cursor-not-allowed bg-white dark:bg-transparent has-[[data-state=checked]]:dark:bg-purple-600 has-[[data-state=checked]]:border-ring ring-transparent has-[[data-state=checked]]:ring-purple-500/50 ring-2 ring-offset-2 ring-offset-transparent has-[[data-state=checked]]:ring-offset-slate-50 has-[[data-state=checked]]:dark:ring-offset-slate-900 has-[[data-state=checked]]:bg-purple-500 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <Checkbox
                  value={item.name.toLowerCase()}
                  className="sr-only after:absolute after:inset-0"
                  checked={state.metal.includes(item.name.toLowerCase())}
                  onClick={() =>
                    dispatch({
                      type: "multiple",
                      value: [
                        { type: "metal", value: item.name.toLowerCase()},
                        { type: "page", value: 1 },
                      ],
                    })
                  }
                />
                <p className="text-sm font-medium leading-none ">
                  {toPascalCase(item.name)}
                </p>
              </label>
            ))}
          </div>
        </fieldset>
      ),
    },
    {
      id: "2",
      title: "Colors",
      content: (
        <fieldset className="space-y-4">
          <div className="grid grid-cols-3 p-1 gap-3">
            {materials.color.map((item: Color) => (
              <label
                key={item.id}
                className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors text-foreground has-[[data-state=checked]]:text-white has-[[data-disabled]]:cursor-not-allowed bg-white dark:bg-transparent has-[[data-state=checked]]:dark:bg-purple-600 has-[[data-state=checked]]:border-ring ring-transparent has-[[data-state=checked]]:ring-purple-500/50 ring-2 ring-offset-2 ring-offset-transparent has-[[data-state=checked]]:ring-offset-slate-50 has-[[data-state=checked]]:dark:ring-offset-slate-900 has-[[data-state=checked]]:bg-purple-500 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <Checkbox
                  id={item.id}
                  value={item.color}
                  className="sr-only after:absolute after:inset-0"
                  checked={state.color.includes(item.color)}
                  onClick={() => dispatch({ type: "color", value: item.color })}
                />
                <p className="text-sm font-medium leading-none ">
                  {item.name}
                </p>
              </label>
            ))}
           
          </div>
        </fieldset>
      ),
    },
    {
      id: "3",
      title: "Size",
      content: (
        <fieldset className="space-y-4">
          <div className="grid grid-cols-3 p-1 gap-3">
            {size.map((item) => (
              <label
                key={item.id}
                className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors text-foreground has-[[data-state=checked]]:text-white has-[[data-disabled]]:cursor-not-allowed bg-white dark:bg-transparent has-[[data-state=checked]]:dark:bg-purple-600 has-[[data-state=checked]]:border-ring ring-transparent has-[[data-state=checked]]:ring-purple-500/50 ring-2 ring-offset-2 ring-offset-transparent has-[[data-state=checked]]:ring-offset-slate-50 has-[[data-state=checked]]:dark:ring-offset-slate-900 has-[[data-state=checked]]:bg-purple-500 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <Checkbox
                  id={item.id}
                  value={item.value}
                  className="sr-only after:absolute after:inset-0"
                  checked={state.size.includes(item.value)}
                  onClick={() =>
                    dispatch({
                      type: "multiple",
                      value: [
                        { type: "size", value: item.value },
                        { type: "page", value: 1 },
                      ],
                    })
                  }
                  disabled={item?.disabled}
                />
                <p className="text-sm font-medium leading-none ">
                  {item.label}
                </p>
              </label>
            ))}
          </div>
        </fieldset>
      ),
    },
    {
      id: "4",
      title: "Availability",
      content: (
        <fieldset className="space-y-4">
          <div className="grid grid-cols-3 p-1 gap-3">
            {availability.map((item) => (
              <label
                key={item.id}
                className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors text-foreground has-[[data-state=checked]]:text-white has-[[data-disabled]]:cursor-not-allowed bg-white dark:bg-transparent has-[[data-state=checked]]:dark:bg-purple-600 has-[[data-state=checked]]:border-ring ring-transparent has-[[data-state=checked]]:ring-purple-500/50 ring-2 ring-offset-2 ring-offset-transparent has-[[data-state=checked]]:ring-offset-slate-50 has-[[data-state=checked]]:dark:ring-offset-slate-900 has-[[data-state=checked]]:bg-purple-500 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <Checkbox
                  id={item.id}
                  value={item.value}
                  className="sr-only after:absolute after:inset-0"
                  checked={state.availability.includes(item.value)}
                  onClick={() =>
                    dispatch({
                      type: "multiple",
                      value: [
                        { type: "availability", value: item.value },
                        { type: "page", value: 1 },
                      ],
                    })
                  }
                />
                <p className="text-sm font-medium leading-none text-nowrap ">
                  {item.label}
                </p>
              </label>
            ))}
          </div>
        </fieldset>
      ),
    },
  ];

  return (
    <div className="w-full px-3 py-1 bg-neutral-100/90 dark:bg-neutral-900/90 lg:bg-transparent rounded-md backdrop-blur-md h-full">
      <span className="h-5 w-full lg:hidden flex items-center justify-end">
        <span
          className="absolute right-2 top-2 w-5 h-5 cursor-pointer"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </span>
      </span>
      {selectedcurrency ? (
        <Price selectedcurrency={selectedcurrency} dispatch={dispatch} />
      ) : (
        <div className="space-y-4 pb-2 border-b-1 ">
          <Label className="text-[15px]">Price</Label>
        </div>
      )}
      <Accordion type="multiple" className="w-full" defaultValue={["1"]}>
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-1">
            <AccordionTrigger
              icon={<></>}
              className="py-2 text-[15px] leading-6 hover:no-underline"
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Sidebar;
