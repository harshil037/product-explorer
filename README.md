# Product Explorer

A modern, high-performance e-commerce product exploration web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**. It features server-side/API-driven filtering and sorting, local currency conversion (INR), debounced input controls, and a persistent shopping cart.

---

## 🚀 Setup & Run Instructions

Follow these steps to run the application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshil037/product-explorer.git
   cd product-explorer


2. **Configure environment variables:**
    Create a .env.local file in the root folder and add the following value (or let it fallback directly from constants.ts):
    ```Code snippet
    NEXT_PUBLIC_API_URL=[https://dummyjson.com](https://dummyjson.com)

3. **Configure environment variables:**
     ```bash
    npm install
    npm run dev


**Folder Structure Overview:**

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, Loading, Errors)
│   ├── page.tsx          # Home page (Catalog grid, search, filters, sort)
│   ├── layout.tsx        # Root layout with Tailwind imports & global font
│   ├── loading.tsx       # Global suspense loading skeleton
│   ├── error.tsx         # Global error boundary wrapper
│   ├── cart/             # Shopping cart management view page
│   └── products/
│       └── [id]/         # Dynamic Product Details page
├── components/           # Reusable UI components
│   ├── common/           # Navbar, Footer
│   ├── products/         # ProductCard, ProductGrid, ProductFilter, ProductSearch, ProductSort
│   └── cart/             # CartItem, CartSummary
├── hooks/                # Custom React hooks
│   ├── useDebounce/      # Search debouncing hook
│   └── useQueryParams/   # Hook synchronizing filters/sort/search with URL query params
├── services/             # API client setup
│   └── apiClient.ts      # Axios instance configured for dummyjson API
├── store/                # Global state management
│   └── useCartStore.ts   # Zustand store with persistence middleware for localStorage
├── types/                # TypeScript interfaces & types
│   └── product.ts        # TypeScript interfaces for Product, Category, and Cart
└── utils/                # Helper functions & configuration
    ├── constants.ts      # App constants (API URL endpoints)
    └── formatters.ts     # Currency formatter utilities