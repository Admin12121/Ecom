import React from "react";
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Slider,
  SliderValue
} from "@nextui-org/react";

const Sidebar = () => {
  const itemClasses = {
    base: "py-1 w-full",
    title: "font-normal text-medium",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  const [value, setValue] = React.useState<SliderValue>([100, 300]);
  const [producttype, setProductType] = React.useState<string[]>(["all"]);
  const [size, setSize] = React.useState<string[]>(["0-12"]);

  const handleCheckboxChange = (value: string[]) => {
    if (value.length > 0) {
      setProductType([value[value.length - 1]]);
    }
  };

  const handlesetSizeChange = (value: string[]) => {
    if (value.length > 0) {
      setSize([value[value.length - 1]]);
    }
  };
  return (
    <Accordion
      variant="splitted"
      defaultExpandedKeys={["1", "2", "3"]}
      isCompact
      itemClasses={itemClasses}
      selectionMode="multiple"
    >
      <AccordionItem
        className="!bg-transparent border-0"
        style={{ boxShadow: "none" }}
        key="1"
        startContent={
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Iconly/Light/Bag-2"
              stroke="#fff"
              strokeWidth="1.5"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g
                id="Bag-2"
                transform="translate(3.000000, 2.500000)"
                stroke="#fff"
                strokeWidth="1.5"
              >
                <path
                  d="M12.7729,6.80503597 L12.7729,3.77303597 C12.7729,1.68903597 11.0839,-1.42108547e-14 9.0009,-1.42108547e-14 C6.9169,-0.00896402892 5.2199,1.67203597 5.2109,3.75603597 L5.2109,3.77303597 L5.2109,6.80503597"
                  id="Stroke-1"
                ></path>
                <path
                  d="M13.7422153,18.500336 L4.2577847,18.500336 C1.90569395,18.500336 0,16.595336 0,14.245336 L0,8.72933597 C0,6.37933597 1.90569395,4.47433597 4.2577847,4.47433597 L13.7422153,4.47433597 C16.094306,4.47433597 18,6.37933597 18,8.72933597 L18,14.245336 C18,16.595336 16.094306,18.500336 13.7422153,18.500336 Z"
                  id="Stroke-3"
                ></path>
              </g>
            </g>
          </svg>
        }
        aria-label="All products"
        title="All products"
      >
        <span className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
            <Slider
              label="Price"
              formatOptions={{ style: "currency", currency: "USD" }}
              step={10}
              maxValue={1000}
              color="secondary"
              minValue={0}
              value={value}
              onChange={setValue}
              className="max-w-md"
            />
            <p className="text-default-500 font-medium text-small">
              Selected budget:{" "}
              {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
            </p>
          </div>
          <CheckboxGroup
            color="secondary"
            label="Product Type"
            value={producttype}
            onValueChange={handleCheckboxChange}
          >
            <Checkbox value="all">All</Checkbox>
            <Checkbox value="fullgold">Full Gold Coted</Checkbox>
            <Checkbox value="halfgold">Half Gold Coted</Checkbox>
            <Checkbox value="brass">Brass</Checkbox>
            <Checkbox value="copper">Copper</Checkbox>
          </CheckboxGroup>
          <CheckboxGroup
            color="secondary"
            label="Select size"
            value={size}
            onValueChange={handlesetSizeChange}
          >
            <Checkbox value="0-12">0 - 12 Inches</Checkbox>
            <Checkbox value="13-24">13 - 24 Inches</Checkbox>
            <Checkbox value="25-36">25 - 36 Inches</Checkbox>
            <Checkbox value="37-48">37 - 48 Inches</Checkbox>
            <Checkbox value="48-100">48 - Higher Inches</Checkbox>
          </CheckboxGroup>
        </span>
      </AccordionItem>
    </Accordion>
  );
};

export default Sidebar;
