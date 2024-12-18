"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Button } from "@/components/ui/button";

interface PriceProps {
  id: number;
  price: number;
}

interface CurrencyRange {
  min: number;
  max: number;
  minsel: number;
  maxsel: number;
}
const items: PriceProps[] = [];
let basePrice = 80;
let increment = 15;
const maxPrice = 5000;
while (basePrice <= maxPrice) {
  items.push({ id: items.length + 1, price: basePrice });
  if (basePrice > 1000) {
    increment = Math.floor(increment * 1.2);
  } else if (basePrice > 500) {
    increment = Math.floor(increment * 1.1);
  }
  basePrice += increment;
}

export default function Price({
  selectedcurrency,
  dispatch
}: {
  selectedcurrency: { sell: number; symbol: string };
  dispatch: any;
}) {
  const tick_count = 40;

  const currencyRanges: { [key: string]: CurrencyRange } = {
    "₹": { min: 500, max: 500000, minsel: 5000, maxsel: 200000 },
    रु: { min: 500, max: 500000, minsel: 5000, maxsel: 200000 },
    $: { min: 100, max: 5000, minsel: 500, maxsel: 2500 },
    "¥": { min: 100, max: 5000, minsel: 500, maxsel: 2500 },
    A$: { min: 100, max: 5000, minsel: 500, maxsel: 2500 },
  };

  const { min, max, minsel, maxsel } = selectedcurrency?.symbol
    ? currencyRanges[selectedcurrency.symbol] || {
        min: 100,
        max: 5000,
        minsel: 500,
        maxsel: 2500,
      }
    : { min: 100, max: 5000, minsel: 500, maxsel: 2500 };

  const minValue = min;
  const maxValue = max;

  const initialValues: number[] = [minsel, maxsel];

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue: initialValues });

  const priceStep = (maxValue - minValue) / tick_count;

  const baseItemCounts = Array(tick_count)
    .fill(0)
    .map((_, tick) => {
      const rangeMin = minValue + tick * priceStep;
      const rangeMax = minValue + (tick + 0.1) * priceStep;
      return items.filter(
        (item) => item.price >= rangeMin && item.price < rangeMax
      ).length;
    });

  const itemCounts = baseItemCounts.map((count, i) => {
    const fluctuation =
      Math.sin((i / tick_count) * Math.PI) * 3 + (Math.random() - 0.5) * 3;
    return Math.max(0, count + Math.round(fluctuation));
  });

  const maxCount = Math.max(...itemCounts);

  const handleSliderValueChange = (values: number[]) => {
    handleSliderChange(values);
  };

  const countItemsInRange = (min: number, max: number) => {
    return items.filter((item) => item.price >= min && item.price <= max)
      .length;
  };

  const isBarInSelectedRange = (
    index: number,
    minValue: number,
    priceStep: number,
    sliderValue: number[]
  ) => {
    const rangeMin = minValue + index * priceStep;
    const rangeMax = minValue + (index + 1) * priceStep;
    return (
      countItemsInRange(sliderValue[0], sliderValue[1]) > 0 &&
      rangeMin <= sliderValue[1] &&
      rangeMax >= sliderValue[0]
    );
  };

  const handlePriceRange = () => { 
    dispatch({ type:"min_price", value: Number(inputValues[0])});
    dispatch({ type:"max_price", value: Number(inputValues[1])});
    dispatch({ type: "page", value: 1 });
  }

  return (
    <div className="space-y-4 pb-2 border-b-1 ">
      <Label className="text-[15px]">Price</Label>
      <div>
        <div className="flex h-12 w-full items-end px-3" aria-hidden="true">
          {itemCounts.map((count, i) => (
            <div
              key={i}
              className="flex flex-1 justify-center"
              style={{
                height: `${(count / maxCount) * 100}%`,
              }}
            >
              <span
                data-selected={isBarInSelectedRange(
                  i,
                  minValue,
                  priceStep,
                  sliderValue
                )}
                className="h-full w-full bg-primary/20"
              ></span>
            </div>
          ))}
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          min={minValue}
          max={maxValue}
          aria-label="Price range"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Label htmlFor="min-price">Min price</Label>
          <div className="relative">
            <Input
              id="min-price"
              className="peer w-full ps-6 bg-white"
              type="text"
              inputMode="decimal"
              value={inputValues[0]}
              onChange={(e) => handleInputChange(e, 0)}
              onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[0], 0);
                }
              }}
              aria-label="Enter minimum price"
            />
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              {selectedcurrency?.symbol}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="max-price">Max price</Label>
          <div className="relative">
            <Input
              id="max-price"
              className="peer w-full ps-6 bg-white"
              type="text"
              inputMode="decimal"
              value={inputValues[1]}
              onChange={(e) => handleInputChange(e, 1)}
              onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[1], 1);
                }
              }}
              aria-label="Enter maximum price"
            />
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              {selectedcurrency?.symbol}
            </span>
          </div>
        </div>
      </div>
      <Button className="w-full" variant="secondary" onClick={handlePriceRange}>
        Apply
      </Button>
    </div>
  );
}
