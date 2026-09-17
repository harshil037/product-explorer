"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { Product } from "@/types/product";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilter from "@/components/products/ProductFilter";
import ProductSort from "@/components/products/ProductSort";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function Home() {
  const searchParams = useSearchParams();
  const { setQueryParam, setQueryParams } = useQueryParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Read state from URL query parameters
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const maxPriceINR = Number(searchParams.get("maxPrice")) || 500000;
  const EXCHANGE_RATE = 83;

  // Fetch data from API based on query parameters
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        let endpoint = "/products?limit=100";
        const params = new URLSearchParams();

        if (searchQuery) {
          endpoint = "/products/search";
          params.append("q", searchQuery);
        } else if (selectedCategory) {
          endpoint = `/products/category/${selectedCategory}`;
        }

        if (sortBy) {
          params.append("sortBy", sortBy);
          params.append("order", sortOrder || "asc");
        }

        const queryString = params.toString();
        const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

        // Fetch products with independent error catch
        let fetchedProducts: Product[] = [];
        try {
          const productsRes = await apiClient.get(fullUrl);
          fetchedProducts = productsRes.data.products || productsRes.data;
        } catch (productErr: any) {
          console.error("Failed to fetch products:", productErr);
          setErrorMessage(
            "Could not load products matching your filter. Please try again.",
          );
        }

        // Fetch categories with independent error catch so categories still load if products fail
        try {
          const categoriesRes = await apiClient.get("/products/categories");
          const cats = categoriesRes.data.map((c: any) =>
            typeof c === "string" ? c : c.slug,
          );
          setCategories(cats);
        } catch (categoryErr) {
          console.error("Failed to fetch categories:", categoryErr);
        }

        // Apply price filter on the returned API data
        if (fetchedProducts.length > 0) {
          fetchedProducts = fetchedProducts.filter(
            (p: Product) => p.price * EXCHANGE_RATE <= maxPriceINR,
          );
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Unexpected error during data fetch", err);
        setErrorMessage("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchQuery, selectedCategory, sortBy, sortOrder, maxPriceINR]);

  const handleSearchChange = useCallback(
    (query: string) => {
      setQueryParam("q", query);
    },
    [setQueryParam],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setQueryParam("category", category);
    },
    [setQueryParam],
  );

  const handlePriceChange = useCallback(
    (price: number) => {
      setQueryParam("maxPrice", price.toString());
    },
    [setQueryParam],
  );

  const handleSortChange = useCallback(
    (newSortBy: string, newSortOrder: string) => {
      setQueryParams({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      });
    },
    [setQueryParams],
  );

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-full overflow-hidden">
      {/* Non-scrolling Top Bar */}
      <div className="shrink-0 bg-gray-50 py-3 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200">
        <ProductSearch
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <ProductSort
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Main Grid Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Stationary Filter Sidebar */}
        <aside className="lg:col-span-1 h-full overflow-y-auto pr-1">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            maxPrice={maxPriceINR}
            onPriceChange={handlePriceChange}
          />
        </aside>

        {/* Independently Scrolling Product Grid */}
        <div className="lg:col-span-3 h-full overflow-y-auto pr-2 pb-12">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
