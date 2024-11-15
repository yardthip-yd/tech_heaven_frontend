import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import PriceRange from "@/components/product/PriceRange";
import { Filter } from "lucide-react";

const FiltersSidebar = ({
  categories,
  category,
  toggleCategory,
  minPrice,
  maxPrice,
  priceRange,
  setPriceRange,
  clearCategory,
}) => {
  return (
    <Card className="max-h-[calc(100vh-4rem)] overflow-auto w-full lg:w-70">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-semibold">Filters</h2>
          </div>
          {category.length > 0 && (
            <button
              onClick={clearCategory}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>

        <Separator className="mb-6" />

        <div className="space-y-6">
          {/* Category Section */}
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-3">Category</h3>
            <ScrollArea className="pr-4 max-h-[250px] sm:max-h-[250px]">
              <div className="space-y-2">
                {categories.sort((a, b) => a.localeCompare(b)).map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat}
                      checked={category.includes(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                    />
                    <label
                      htmlFor={cat}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Price Range Section */}
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-3">Price</h3>
            <PriceRange
              priceRange={priceRange}
              onPriceChange={(newRange) => setPriceRange(newRange)}
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersSidebar;
