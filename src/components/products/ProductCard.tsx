import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <>
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
        <div className="flex items-center mt-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600 ml-1 font-medium">
            {product.rating}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-gray-950">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            View Details
          </span>
        </div>
      </div>
    </Link>
    </>
  )
}
