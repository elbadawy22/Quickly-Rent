"use client";
import { useEffect, useState } from "react";
import { Eye, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { Categories, Products, UsersDots } from "../../lib/taypes";
import { getCategories } from "../../lib/services/client/categories.services";
import Loader from "../../components/loader/Loader";
import { getProductsClient } from "../../lib/services/client/products.services";
import Image from "next/image";
import ProductItem from "../../components/puplicUsed/ProductItem";

export default function ProductManagementPage() {
  const [filteredCategory, setFilteredCategory] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery == "") setLoading(true);
    getProductsClient({
      search: searchQuery,
      categoryId: "",
      maxPrice: "",
      minPrice: "",
      priceOrder: "",
      pageNumber: pageNum.toString(),
    })
      .then((res) => res.json())
      .then((res) => {
        setFilteredCategory(res.data);
        setCount(res.count);
        setPageNum(res.page);
        setPageNumData(res.countPagn);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
        setLoading(false);
      });
  }, [searchQuery, pageNum]);

  return (
    <div className="p-6 min-h-screen bg-zinc-100 pt-15 ">
      {/* Filters */}
      <div className="mb-6 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <Link
            href="products/create"
            className="flex max-w-xs items-center justify-center rounded-lg bg-teal-600 transition-colors hover:bg-teal-700"
          >
            <span className="w-full py-2 pl-3 text-sm font-semibold text-white md:py-0">
              Add New Vehicle
            </span>
            <div className="px-2 md:pr-2">
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="rounded-l-lg border border-zinc-200 bg-zinc-900 p-2 pl-3">
                <Search className="size-5 text-white" aria-hidden />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNum(1);
                }}
                placeholder="Search by Name..."
                className="w-full rounded-r-lg border border-l-0 border-zinc-200 bg-white py-2 pr-4 pl-3 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500/25"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
        <div className="grid w-full grid-cols-2 gap-3 overflow-hidden bg-white px-3 py-6 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filteredCategory?.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
          <p className="text-sm text-zinc-500">
            {/* Showing {filteredUsers.length} of  orders.length orders */}
          </p>

          <div className="flex ">
            <button
              hidden={pageNum <= 1}
              className="cursor-pointer rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              onClick={(e) => setPageNum(pageNum - 1)}
            >
              Previous...
            </button>
            {Array.from({ length: Math.ceil(count / pageNumData) })?.map(
              (_, i) => (
                <div key={i}>
                  {i + 1 <= pageNum + 1 && i + 1 >= pageNum - 1 ? (
                    <button
                      value={i + 1}
                      className={`mx-0.5 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition ${pageNum == i + 1 ? "bg-zinc-900 text-white shadow-sm" : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"}`}
                      onClick={() => {
                        setPageNum(i + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  ) : null}
                </div>
              ),
            )}
            <button
              hidden={
                pageNum >= parseInt(Math.ceil(count / pageNumData).toString())
              }
              className="cursor-pointer rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              onClick={(e) => setPageNum(pageNum + 1)}
            >
              ...Next
            </button>
          </div>
        </div>
      </div>

      {loading ? <Loader /> : ""}

      <div className="mt-15 w-full h-5"></div>
    </div>
  );
}
