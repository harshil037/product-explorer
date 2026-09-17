"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (query: string) => void;
}

export default function ProductSearch({
  searchTerm,
  onSearchChange,
}: ProductSearchProps) {
  const [value, setValue] = useState(searchTerm);
  const debouncedValue = useDebounce(value, 500);

  // Sync local state if URL search param changes externally
  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      onSearchChange(debouncedValue);
    }
  }, [debouncedValue, searchTerm, onSearchChange]);

  return (
    <div className="relative flex-1 max-w-lg">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <Search className="w-5 h-5" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products by name..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900"
      />
    </div>
  );
}

// import { useDebounce } from "@/hooks/useDebounce";
// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";

// interface ProductSearchProps {
//   searchTerm: string;
//   onSearchChange: (query: string) => void;
// }

// export default function ProductSearch({
//   searchTerm,
//   onSearchChange,
// }: ProductSearchProps) {
//   const [value, setValue] = useState(searchTerm);
//   const debounceValue = useDebounce(value, 500);

//   useEffect(() => {
//     onSearchChange(debounceValue);
//   }, [debounceValue, onSearchChange]);

//   return (
//     <div className="relative flex-1 max-w-lg">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
//         <Search className="w-5 h-5" />
//       </span>

//       <input
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Search products by name..."
//         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900"
//       />
//     </div>
//   );
// }
