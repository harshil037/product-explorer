"use client";

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
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>

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

      <div>
        <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
          <span>Max Price</span>
          <span>Rs. {maxPrice}</span>
        </div>
        <input
          type="range"
          min="0"
          max="300000"
          step="1000"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
