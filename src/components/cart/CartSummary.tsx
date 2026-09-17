"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatters";
import { useState } from "react";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const exchangeRate = 83;
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity * exchangeRate,
    0,
  );
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  function handleCheckout() {
    setIsCheckedOut(true);
    clearCart();
  }

  if (isCheckedOut) {
    return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm text-center space-y-4">
        <h3 className="text-lg font-bold text-green-600">
          Order Placed Successfully!
        </h3>
        <p className="text-sm text-gray-600">
          Thank you for your purchase. Your items are on the way.
        </p>
        <button
          onClick={() => setIsCheckedOut(false)}
          className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900 text-base">Order Summary</h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(subtotal / exchangeRate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="font-medium text-gray-900">
            {subtotal > 0
              ? formatCurrency(shipping / exchangeRate)
              : formatCurrency(0)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-950">
          <span>Total</span>
          <span>{formatCurrency(total / exchangeRate)}</span>
        </div>
      </div>

      <button
        disabled={items.length === 0}
        onClick={handleCheckout}
        className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
