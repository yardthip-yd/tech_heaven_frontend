import React from "react";
import * as Slider from "@radix-ui/react-slider";

const PriceRange = ({ priceRange, onPriceChange, min, max }) => {
  const handleChange = (values) => {
    onPriceChange(values);
  };

  return (
    <div className="w-[230px]">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={100}
        value={priceRange}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-slate-200 relative flex-grow rounded-full h-[6px]">
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-blue-600 rounded-full shadow" />
        <Slider.Thumb className="block w-4 h-4 bg-blue-600 rounded-full shadow" />
      </Slider.Root>
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="bg-slate-200 p-2 w-24 text-center rounded">
          {priceRange[0].toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <span>-</span>
        <div className="bg-slate-200 p-2 w-24 text-center rounded">
          {priceRange[1].toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
