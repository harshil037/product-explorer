'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/product';
import { formatCurrency } from '@/utils/formatters';
import { useCartStore } from '@/store/useCartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
          <Image
            src={item.product.thumbnail}
            alt={item.product.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{item.product.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{formatCurrency(item.product.price)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-medium text-gray-900">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <span className="text-sm font-bold text-gray-950 w-28 text-right">
          {formatCurrency(item.product.price * item.quantity)}
        </span>

        <button
          onClick={() => removeItem(item.product.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}