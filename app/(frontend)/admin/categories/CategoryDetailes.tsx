"use client";
import {
  Edit,
  ImageDownIcon,
  MessageCircleWarning,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Categories, Products, UsersDots } from "../../lib/taypes";

import DeleteCategory from "./DeleteCategory";
import Image from "next/image";
import { updateCategory } from "../../lib/services/client/categories.services";
import Loader from "../../components/loader/Loader";
import Link from "next/link";
import ProductItem from "../../components/puplicUsed/ProductItem";

const CategoryDetailes = ({ category }: { category: Categories }) => {
  const [categoryData, setCategoryData] = useState<Categories>(category);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [descriptionInput, setDescriptionInput] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<boolean>(false);
  const [togelProducts, setTogelProducts] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateCategory(e, category.id).then((res) => res);
    if (updated?.category) {
      setCategoryData(updated.category);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }
    setNameInput(false);
    setDescriptionInput(false);
    setImageInput(false);
    setLoading(false);
  };
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex w-full flex-col items-center justify-around gap-8 md:flex-row md:gap-10">
          <form
            action={handelSubmit}
            onSubmit={() => setLoading(true)}
            className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 py-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm md:flex-row md:gap-10 md:py-8"
          >
            <div className="flex w-full flex-col items-center justify-center px-3">
              {/* image  */}
              <div className="flex w-full items-center justify-end gap-1 px-1">
                {imageInput ? (
                  <div className="flex items-center gap-1">
                    <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                      {" "}
                      <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                    </button>
                    <span onClick={() => setImageInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                      <X className="size-4" aria-hidden />
                    </span>
                  </div>
                ) : (
                  <Edit
                    onClick={() => {
                      setImageInput(true);
                      setNameInput(false);
                      setDescriptionInput(false);
                      setFileUploaded("");
                    }}
                    className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                  />
                )}
              </div>{" "}
              {/* image cover Change */}
              <div className="flex justify-center px-4 text-sm text-zinc-700">
                {imageInput ? (
                  <>
                    <div className="col-span-full w-full max-w-md">
                      <div className="flex justify-center rounded-2xl border border-dashed border-teal-300/50 bg-gradient-to-br from-teal-50/40 to-zinc-50/80 px-6 py-6">
                        <div className="text-center">
                          <ImageDownIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-teal-600/70"
                          />
                          <div className="text-xs text-zinc-500">{fileUploaded}</div>
                          <div className="mt-4 flex text-sm text-zinc-500">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer rounded-lg font-semibold text-teal-700 transition hover:text-teal-800 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  setFileUploaded(e.target.value)
                                }
                              />
                            </label>
                            {/* <p className="pl-1">or drag and drop</p> */}
                          </div>
                          <p className="text-xs text-zinc-400">
                            PNG, JPG, GIF
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src={categoryData.images[0]?.url}
                    alt={categoryData.images[0]?.id}
                    className="rounded-xl border border-zinc-200/80 object-cover shadow-md"
                  />
                )}
              </div>
            </div>
            {/* Name And Description */}
            <div className="w-full px-4 md:w-auto md:max-w-lg md:px-6">
              <div className="flex flex-col">
                <div className="mb-3 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Name</span>
                    {nameInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                          {" "}
                          <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                        </button>
                        <span onClick={() => setNameInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                          <X className="size-4" aria-hidden />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(true);
                          setImageInput(false);
                          setDescriptionInput(false);
                          setFileUploaded("");
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {nameInput ? (
                      <input
                        name="name"
                        type="text"
                        autoFocus
                        className="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        required
                        defaultValue={categoryData?.name}
                      />
                    ) : (
                      categoryData?.name || "N/A"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-1 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Description</span>
                    {descriptionInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                          {" "}
                          <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                        </button>
                        <span onClick={() => setDescriptionInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                          <X className="size-4" aria-hidden />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setImageInput(false);
                          setDescriptionInput(true);
                          setFileUploaded("");
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <div className="mt-2 max-h-52 w-full overflow-auto px-1 text-sm text-zinc-700">
                    {descriptionInput ? (
                      <textarea
                        name="description"
                        autoFocus
                        className="min-h-[8rem] w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 lg:min-w-88"
                        required
                        defaultValue={categoryData?.description}
                      ></textarea>
                    ) : (
                      <div className="max-h-52 w-full overflow-auto rounded-lg bg-zinc-50/80 px-3 py-2">
                        {categoryData?.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Products */}
        <div className="mt-10 w-full rounded-2xl border border-zinc-200/80 bg-white/85 px-4 py-8 shadow-md shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition-all duration-100 sm:px-6">
          {categoryData.product.length > 0 ? (
            <div className="grid w-full grid-cols-2 gap-3 gap-x-2 gap-y-6 overflow-hidden rounded-xl bg-gradient-to-b from-zinc-50/50 to-white px-2 py-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {categoryData.product?.map((product) => (
                <ProductItem product={product} key={product.id} />

              ))}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-10 text-sm text-zinc-500">
              {" "}
              <MessageCircleWarning className="size-5 shrink-0 text-amber-500" aria-hidden /> No Products found in this
              category..!{" "}
            </div>
          )}
        </div>
      </div>
      <DeleteCategory category={category} />
      {loading ? <Loader /> : ""}
    </section>
  );
};

export default CategoryDetailes;
