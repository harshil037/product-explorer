"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Read state from URL query parameters
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || 2000;
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  // Fetch all products and categories once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get("/products?limit=50"),
          apiClient.get("/products/categories"),
        ]);

        setAllProducts(productsRes.data.products || productsRes.data);

        const cats = categoriesRes.data.map((c: any) =>
          typeof c === "string" ? c : c.slug,
        );
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Inside your Home component filter logic:
  const EXCHANGE_RATE = 83;

  // Read maxPrice from URL, default to 500000 INR if not set
  const maxPriceINR = Number(searchParams.get("maxPrice")) || 500000;

  // Filter and sort products locally based on current criteria
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter (convert API USD price to INR for comparison with slider)
    result = result.filter((p) => p.price * EXCHANGE_RATE <= maxPriceINR);

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        const valA = Number(a[sortBy as keyof Product]) || 0;
        const valB = Number(b[sortBy as keyof Product]) || 0;
        if (sortOrder === "asc") {
          return valA - valB;
        } else {
          return valB - valA;
        }
      });
    }

    return result;
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    maxPriceINR,
    sortBy,
    sortOrder,
  ]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
        </aside>
        <div className="lg:col-span-3">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
