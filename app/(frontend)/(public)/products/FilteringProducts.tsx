"use client";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FilteringProducts = () => {
  const router = useRouter();
  const path = useSearchParams();
  const query = new URLSearchParams();
  const minPriceVal = path.get("minPrice") || "" as string;
  const maxPriceVal = path.get("maxPrice") || "" as string;
  const priceOrderVal = path.get("priceOrder") || "" as string;

  const handelFilterAction = (e: FormData) => {
    const minPrice = e.get("minPrice") as string;
    const maxPrice = e.get("maxPrice") as string;
    const priceOrder = e.get("priceOrder") as string;
    if (minPrice !== "") {
      query.delete("minPrice");
      query.append("minPrice", minPrice);
    } else {
      query.delete("minPrice");
    }
    if (maxPrice !== "") {
      query.delete("maxPrice");
      query.append("maxPrice", maxPrice);
    } else {
      query.delete("maxPrice");
    }
    if (priceOrder !== "") {
      query.delete("priceOrder");
      query.append("priceOrder", priceOrder);
    } else {
      query.delete("priceOrder");
    }
    router.push(`products?${query.toString()}`);
  };
  return (
    <form action={handelFilterAction} className="flex w-full min-w-0 flex-col gap-3 border-b border-zinc-100 px-2 pb-4 md:w-56 md:shrink-0 md:border-b-0 md:border-r md:pr-4">
      <div className="flex items-center gap-2 text-zinc-900">
        <h3 className="text-sm font-semibold tracking-tight md:text-base">Products Filtering</h3>
        <SlidersHorizontal className="size-4 text-teal-600" aria-hidden />
      </div>
      <div className="flex w-full flex-col gap-2 border-b border-zinc-100 py-3 md:border-0 md:py-0">
        <input
          type="text"
          name="minPrice"
          placeholder="Min Price"
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 md:w-full"
          defaultValue={minPriceVal}
        />
        <input
          type="text"
          name="maxPrice"
          placeholder="Max Price"
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 md:w-full"
          defaultValue={maxPriceVal}
        />
        <select
          name="priceOrder"
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 md:w-full"
          defaultValue={priceOrderVal}
        >
          <option value="" className="text-zinc-400">
            Order Price
          </option>
          <option value="asc" className="text-zinc-700">
            From Low
          </option>
          <option value="desc" className="text-zinc-700">
            From High
          </option>
        </select>
        <div className="flex gap-2 md:flex-col">
          <button
            type="submit"
            className="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 md:w-full md:text-sm"
          >
            Filter
          </button>
          <Link
            href="/products"
            className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50 md:w-full md:text-sm"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
};

export default FilteringProducts;
