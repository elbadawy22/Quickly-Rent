"use client";
import Loader from "@/app/(frontend)/components/loader/Loader";
import { createNewCategory } from "@/app/(frontend)/lib/services/client/categories.services";
import { ImageDownIcon, ShoppingBag, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const router = useRouter();
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handelAction = async (e: FormData) => {
      const creater = await createNewCategory(e);
      if (creater.ok) {
        const success = await creater.json();
        toast.success(success.message);
        router.push("/admin/categories");
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
            Create A New Brand
          </h2>
          <form action={handelAction} onSubmit={()=> setLoading(true)} className="mt-8 w-full">
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
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={(e) => setFileUploaded(e.target.value)}
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
                  Brand Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Fiat.."
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
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
                    placeholder="Brand info...."
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
                {loading ? "Creating..." : "Create Brand"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading ? <Loader /> : ""}
    </section>
  );
};

export default CreateCategory;
