import React from "react";
import { Accordion, AccordionItem, CheckboxGroup, Checkbox, Slider, SliderValue } from "@nextui-org/react";

const Sidebar = () => {
    const itemClasses = {
        base: "py-1 w-full",
        title: "font-normal text-medium",
        // trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
      };
   const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ";
    const [value, setValue] = React.useState<SliderValue>([100, 300]);
  return (
    <div className="min-w-[350px] w-[20%] py-10  pl-5 flex min-h-[100vh] h-full flex-col gap-5 max-llg:hidden">
        <h1 className="text-lg">Category</h1>
      <Accordion variant="splitted" defaultExpandedKeys={["1"]} isCompact itemClasses={itemClasses}>
        <AccordionItem key="1" 
        startContent={<svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Iconly/Light/Bag-2" stroke="#fff"  strokeWidth="1.5"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Bag-2" transform="translate(3.000000, 2.500000)" stroke="#fff"  strokeWidth="1.5" >
                    <path d="M12.7729,6.80503597 L12.7729,3.77303597 C12.7729,1.68903597 11.0839,-1.42108547e-14 9.0009,-1.42108547e-14 C6.9169,-0.00896402892 5.2199,1.67203597 5.2109,3.75603597 L5.2109,3.77303597 L5.2109,6.80503597" id="Stroke-1"></path>
                    <path d="M13.7422153,18.500336 L4.2577847,18.500336 C1.90569395,18.500336 0,16.595336 0,14.245336 L0,8.72933597 C0,6.37933597 1.90569395,4.47433597 4.2577847,4.47433597 L13.7422153,4.47433597 C16.094306,4.47433597 18,6.37933597 18,8.72933597 L18,14.245336 C18,16.595336 16.094306,18.500336 13.7422153,18.500336 Z" id="Stroke-3"></path>
                </g>
            </g>
        </svg>} 
        aria-label="All products" title="All products">
          <span className="flex flex-col gap-3">
              <CheckboxGroup
                  color="secondary"
                  label="Product Type"
                  defaultValue={["all"]}
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
                  defaultValue={["12", "13"]}
                >
                  <Checkbox value="12">0 - 12 Inches</Checkbox>
                  <Checkbox value="24">13 - 24 Inches</Checkbox>
                  <Checkbox value="36">25 - 36 Inches</Checkbox>
                  <Checkbox value="48">37 - 48 Inches</Checkbox>
                  <Checkbox value="100">48 - Higher Inches</Checkbox>
              </CheckboxGroup>
              <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                <Slider 
                  label="Select a budget"
                  formatOptions={{style: "currency", currency: "USD"}}
                  step={10}
                  maxValue={1000}
                  color="secondary"
                  minValue={0}
                  value={value} 
                  onChange={setValue}
                  className="max-w-md"
                />
                <p className="text-default-500 font-medium text-small">
                  Selected budget: {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
                </p>
              </div>
          </span>
        </AccordionItem>
        <AccordionItem key="2" 
            startContent={ <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Iconly/Light/Discount" stroke="#fff"  strokeWidth="1.5"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g id="Discount" transform="translate(2.000000, 2.000000)" stroke="#fff" >
                        <path d="M2.7949,5.056 C2.7949,3.807 3.8069,2.795 5.0559,2.794 L6.0849,2.794 C6.6819,2.794 7.2539,2.557 7.6779,2.137 L8.3969,1.417 C9.2779,0.531 10.7099,0.527 11.5959,1.408 L11.5969,1.409 L11.6059,1.417 L12.3259,2.137 C12.7499,2.558 13.3219,2.794 13.9189,2.794 L14.9469,2.794 C16.1959,2.794 17.2089,3.806 17.2089,5.056 L17.2089,6.083 C17.2089,6.68 17.4449,7.253 17.8659,7.677 L18.5859,8.397 C19.4719,9.278 19.4769,10.71 18.5959,11.596 C18.5959,11.596 18.5949,11.597 18.5949,11.597 L18.5859,11.606 L17.8659,12.326 C17.4449,12.749 17.2089,13.321 17.2089,13.918 L17.2089,14.947 C17.2089,16.196 16.1969,17.208 14.9479,17.208 L14.9469,17.208 L13.9169,17.208 C13.3199,17.208 12.7469,17.445 12.3239,17.866 L11.6039,18.585 C10.7239,19.471 9.2929,19.476 8.4069,18.597 C8.4059,18.596 8.4049,18.595 8.4039,18.594 L8.3949,18.585 L7.6759,17.866 C7.2529,17.445 6.6799,17.209 6.0829,17.208 L5.0559,17.208 C3.8069,17.208 2.7949,16.196 2.7949,14.947 L2.7949,13.916 C2.7949,13.319 2.5579,12.747 2.1369,12.324 L1.4179,11.604 C0.5319,10.724 0.5269,9.293 1.4069,8.407 C1.4069,8.406 1.4079,8.405 1.4089,8.404 L1.4179,8.395 L2.1369,7.675 C2.5579,7.251 2.7949,6.679 2.7949,6.081 L2.7949,5.056" id="Stroke-1" strokeWidth="1.5" ></path>
                        <line x1="7.4316" y1="12.5717" x2="12.5716" y2="7.4317" id="Stroke-3" strokeWidth="1.5" ></line>
                        <line x1="12.4955" y1="12.5" x2="12.5045" y2="12.5" id="Stroke-11" strokeWidth="1.5" ></line>
                        <line x1="7.4955" y1="7.5" x2="7.5045" y2="7.5" id="Stroke-11" strokeWidth="1.5" ></line>
                    </g>
                </g>
            </svg>
            } 
         aria-label="New Arrival" title="New Arrival">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" 
            startContent={ <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Iconly/Light/Search" stroke="#fff"  strokeWidth="1.5"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g id="Search" transform="translate(2.000000, 2.000000)" stroke="#fff"  strokeWidth="1.5" >
                            <circle id="Ellipse_739" cx="9.76659044" cy="9.76659044" r="8.9885584"></circle>
                            <line x1="16.0183067" y1="16.4851259" x2="19.5423342" y2="20.0000001" id="Line_181"></line>
                        </g>
                    </g>
                </svg>
            }
        aria-label="On Discount" title="On Discount">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;