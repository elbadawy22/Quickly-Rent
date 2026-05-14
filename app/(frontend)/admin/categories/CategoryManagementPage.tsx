"use client";
import { useEffect, useState } from "react";
import { Eye, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { Categories, UsersDots } from "../../lib/taypes";
import { getCategories } from "../../lib/services/client/categories.services";
import Loader from "../../components/loader/Loader";
import Image from "next/image";

export default function CategoryManagementPage() {
  const [filteredCategory, setFilteredCategory] = useState<Categories[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery == "") setLoading(true);
    getCategories(searchQuery, pageNum)
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
    <div className="p-6 pt-15 min-h-screen bg-zinc-100">
      {/* Filters */}
      <div className="mb-6 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <Link
            href="categories/create"
            className="flex max-w-xs items-center justify-center rounded-lg bg-teal-600 transition-colors hover:bg-teal-700"
          >
            <span className="w-full py-2 pl-3 text-sm font-semibold text-white md:py-0">
              Add New Brand
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
          {filteredCategory?.map((category) => (
            <Link href={`categories/${category.id}`} key={category.id}>
              <div className="w-full shadow-sm rounded-lg">
                <div
                  className="  flex flex-col items-center w-auto h-auto rounded-t-md overflow-hidden  "
                >
                  {category.images.length > 0 ? (
                    <Image
                      className="w-50  h-auto  hover:scale-75  transition-all duration-200 overflow-hidden cursor-pointer "
                      width={250}
                      height={250}
                      src={category.images[0].url}
                      alt={category.images[0].id}
                    />
                  ) : (
                    ""
                  )}
                  <div className="text-xs px-2  w-full flex items-center justify-between  ">
                    <div className="w-full flex text-gray-500 pt-3 gap-1">
                      {" "}
                      <span>
                        {category.createdAt.split("T")[0].split("-")[2]}/
                        {category.createdAt.split("T")[0].split("-")[1]}/
                        {category.createdAt.split("T")[0].split("-")[0]}
                      </span>
                      {" @ "}
                      <span>
                        {category.createdAt.split("T")[1].slice(0, 5)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  px-2">
                  <div className="flex items-center">
                    <h3 className="text-slate-800 text-sm md:text-md font-bold overflow-x-hidden   ">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex items-end">
                    <h3 className="text-slate-500 pl-3 text-sm md:text-md font-bold overflow-x-hidden   ">
                      {category.description?.slice(0, 20)}{" "}
                      {category?.description?.length > 20 ? (
                        <span className="text-gray-400 text-xs ">.......</span>
                      ) : (
                        ""
                      )}
                    </h3>
                  </div>

                  <div className="pb-1  flex flex-col ">
                    <span className="text-red-700 text-[12px] flex gap-1 items-center ">
                      <span className="">
                        {category.product.length.toLocaleString()}
                      </span>{" "}
                      <span>Product</span>
                    </span>
                    <span className="text-xs font-bold text-teal-700 md:text-sm">
                      {category.createdBy.email}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
          {/* <p className="text-sm text-gray-600">
          </p> */}

          <div className="flex ">
            {/* <button
              hidden={pageNum <= 1}
              className="px-3  py-1 cursor-pointer border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum - 1)}
            >
              Previous...
            </button> */}
            {/* {Array.from({ length: Math.ceil(count / pageNumData) })?.map(
              (_, i) => (
                <div key={i}>
                  {i + 1 <= pageNum + 1 && i + 1 >= pageNum - 1 ? (
                    <button
                      value={i + 1}
                      className={`px-3 mx-1 py-1 ${pageNum == i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 rounded hover:bg-gray-50"} cursor-pointer   rounded`}
                      onClick={() => {
                        setPageNum(i + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  ) : null}
                </div>
              ),
            )} */}
            
            {/* <button
              hidden={
                pageNum >= parseInt(Math.ceil(count / pageNumData).toString())
              }
              className="px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum + 1)}
            >
              ...Next
            </button> */}
          </div>
        </div>
      </div>

      {loading ? <Loader /> : ""}

      <div className="mt-15 w-full h-5"></div>
    </div>
  );
}
