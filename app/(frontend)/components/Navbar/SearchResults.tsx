"use client";
import { useState } from "react";
import Link from "next/link";
import { Products } from "../../lib/taypes";
import { getProductsClient } from "../../lib/services/client/products.services";
import { useRouter } from "next/navigation";

const SearchResults = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [data, setdata] = useState<Products[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();
  const handelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    setSearchInput(e.target.value);
    const fetchSearch = await getProductsClient({
      search: e.target.value,
    }).then((res) => res.json());
    await setdata(fetchSearch.data);
    if (data.length > 0 && e.target.value != "") {
      setOpen(false);
    }
  };
  const handelEnter = async (e: FormData) => {
    const name = e.get("search") as string;
    setOpen(true);
    if (name != "") {
      router.push(`products?search=${name}`);
      setOpen(true);
    }
  };
  return (
    <div className="relative w-full min-w-0">
      <form
        action={handelEnter}
        className="grow w-full px-1 pr-3 sm:px-4 md:hidden"
      >
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border border-zinc-200  px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition-shadow placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          defaultValue={searchInput}
          onChange={handelChange}
          name="search"
        />
      </form>
      <form
        action={handelEnter}
        className="hidden grow w-full px-1 pr-3 sm:px-4 md:block"
      >
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-400 focus:bg-white  px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition-shadow placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          defaultValue={searchInput}
          onChange={handelChange}
          name="search"
        />
      </form>
      {/* <!-- Dropdown menu --> */}
      <div className="fixed right-0 top-14 z-60 w-full max-w-2xl overflow-hidden px-4 pb-3 md:absolute md:left-0 md:right-0 md:top-full md:z-60 md:mt-1.5 md:max-w-none md:px-0 md:pb-0">
        <div
          hidden={open}
          className="w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-900/5 backdrop-blur-md"
        >
          <div className="p-2.5">
            <div className="flex items-center space-x-1.5 rounded-xl border-b border-zinc-100/90 bg-linear-to-r from-zinc-50/80 to-teal-50/30 px-3 py-2.5 text-sm">
              <div className="flex items-center gap-1.5 font-semibold tracking-tight text-zinc-800">
                Search results
              </div>
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto px-2 pb-2 pt-0.5 text-sm font-medium text-zinc-600">
            {data?.map((item, i) => (
              <li key={i} className="border-b border-zinc-100/80 last:border-0">
                <Link
                  href={`/products?search=${item.name}`}
                  onClick={() => {
                    setOpen(true);
                    setSearchInput("");
                  }}
                  className="inline-flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-700 transition-colors duration-150 hover:bg-teal-50/90 hover:text-teal-950 active:bg-teal-100/80"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!open ? (
        <div
          className="fixed inset-0 z-55 bg-transparent"
          onClick={() => setOpen(true)}
          aria-hidden
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchResults;
