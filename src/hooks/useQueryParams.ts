"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const setQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return {
    searchParams,
    setQueryParam,
    setQueryParams,
  };
}

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";

// export function useQueryParams() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const setQueryParam = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (value) {
//         params.set(name, value);
//       } else {
//         params.delete(name);
//       }

//       router.replace(`?${params.toString()}`, { scroll: false });
//     },
//     [router, searchParams],
//   );

//   return { searchParams, setQueryParam };
// }

// "use client"
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";

// export function useQueryParams() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (value) {
//         params.set(name, value);
//       } else {
//         params.delete(name);
//       }
//       return params.toString();
//     },
//     [searchParams],
//   );
//   function setQueryParam(name: string, value: string) {
//     const queryString = createQueryString(name, value);
//     router.push(`?${queryString}`, { scroll: false });
//   }

//   return { searchParams, setQueryParam };
// }
