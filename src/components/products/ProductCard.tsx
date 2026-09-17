"use client";

import React from "react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { Star, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-gray-900 truncate mt-1">
          {product.title}
        </h3>
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600 ml-1 font-medium">
            {product.rating}
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-base font-bold text-gray-950">
            {formatCurrency(product.price)}
          </span>
        </div>
        <div className="mt-2 flex w-full justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-2" /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
