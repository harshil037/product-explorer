import { apiClient } from "@/services/apiClient";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { Star, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButtonClient from "@/components/products/AddToCartButton";

async function getProduct(id: string): Promise<Product> {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg bg-gray-100 overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="relative h-20 rounded-md bg-gray-100 overflow-hidden border border-gray-200"
              >
                <Image
                  src={img}
                  alt={`${product.title} ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-950 mt-1">
              {product.title}
            </h1>

            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-gray-700 ml-1">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            <div className="text-3xl font-extrabold text-gray-950 mt-4">
              {formatCurrency(product.price)}
            </div>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
            <AddToCartButtonClient product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
