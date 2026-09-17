"use client";

import { useState, useEffect } from "react";

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onPriceChange,
}: ProductFilterProps) {
  // Local state for instant slider responsiveness without immediate API spam
  const [localPrice, setLocalPrice] = useState(maxPrice);

  // Sync local price if URL changes externally
  useEffect(() => {
    setLocalPrice(maxPrice);
  }, [maxPrice]);

  // Handle slider drag (updates UI instantly)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalPrice(value);
  };

  // Trigger API call only after user stops sliding (debounced by 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localPrice !== maxPrice) {
        onPriceChange(localPrice);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localPrice, maxPrice, onPriceChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Filters
      </h3>

      {/* Category selection (using the custom compact dropdown we made) */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Range Slider */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
          <span>Max Price</span>
          <span>Rs. {localPrice}</span>
        </div>
        <input
          type="range"
          min="0"
          max="300000"
          step="1000"
          value={localPrice}
          onChange={handleSliderChange}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
