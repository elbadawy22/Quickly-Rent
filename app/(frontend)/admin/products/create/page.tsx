"use client";
import Loader from "@/app/(frontend)/components/loader/Loader";
import { createNewProduct } from "@/app/(frontend)/lib/services/client/products.services";
import { Categories } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import { ImageDownIcon, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const router = useRouter();
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {category} = useAuth() 

  const handelAction = async (e: FormData) => {
      const creater = await createNewProduct(e);
      if (creater.ok) {
        const success = await creater.json();
        toast.success(success.message);
        router.push("/admin/products");
      }
      if (!creater.ok) {
        const fail = await creater.json();
        toast.error(fail.message);
      }
      setFileUploaded("");
    setLoading(false);
  };
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl justify-center">
        <div className="w-full rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
            <ShoppingBag className="size-5 shrink-0 text-teal-600" aria-hidden />
            Create A New Product
          </h2>
          <form
            action={handelAction}
             onSubmit={()=> setLoading(true)}
            className="mt-8 w-full"
          >
            <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full  ">
                <div className="flex justify-center rounded-2xl border border-dashed border-teal-300/50 bg-gradient-to-br from-teal-50/40 to-zinc-50/80 px-6 py-6">
                  <div className="mt-1 text-center">
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
                        {/* <span>Upload a file</span> */}
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="border-none outline-none file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-teal-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-teal-500"
                          onChange={(e) => console.log(e.target.value)}
                          multiple
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-zinc-400">PNG, JPG, GIF</p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jone Dou"
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="stock" className="block text-sm font-medium text-zinc-700">
                  Stock: <span></span>
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    type="text"
                    name="stock"
                    placeholder="000"
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-zinc-700">
                  Price: <span></span>
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    placeholder="0,000"
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="categoryId" className="block text-sm font-medium text-zinc-700">
                  Category
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="categoryId"
                    name="categoryId"
                    autoComplete="categoryId-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-xl border border-zinc-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-zinc-800 shadow-sm outline-none transition-[border-color,box-shadow] *:rounded-md *:bg-zinc-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  >
                    <option  className=" disabled ">Choose Category...</option>
                    {category?.map((catg:Categories)=>
                    
                    <option key={catg.id} value={catg.id} className="text-black">
                      {catg.name}
                    </option>
                    )}
                  </select>

                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2.5 size-5 self-center justify-self-end text-zinc-400 sm:size-4"
                  >
                    <path
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Category info...."
                    autoComplete="given-name"
                    className="block min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-10 flex w-full justify-center">
              <button
                type="submit"
                className="w-full max-w-xs cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:from-teal-500 hover:to-cyan-600 hover:shadow-teal-900/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:opacity-55"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading ? <Loader /> : ""}
    </section>
  );
};

export default CreateProduct;
