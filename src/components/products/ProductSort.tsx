"use client";

interface ProductSortProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export default function ProductSort({
  sortBy,
  sortOrder,
  onSortChange,
}: ProductSortProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (val === "price-asc") onSortChange("price", "asc");
    else if (val === "price-desc") onSortChange("price", "desc");
    else if (val === "rating-desc") onSortChange("rating", "desc");
    else onSortChange("", "");
  }

  const currentVal = sortBy ? `${sortBy}-${sortOrder}` : "";

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-medium text-gray-700">Sort by:</span>
      <select
        value={currentVal}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: Highest</option>
      </select>
    </div>
  );
}
