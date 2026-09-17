import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-950 tracking-tight"
        >
          Product Explorer
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            ALL Products
          </Link>
        </nav>
        <Link
          href="/cart"
          className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
