"use client";
import { useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Categories, UserProfile } from "../../lib/taypes";
import DropDownUserInfo from "./DropDownUserInfo";
import { logOut } from "../../lib/auth/logOut";
import { useRouter } from "next/navigation";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import { useAuth } from "../../providers/AuthProvider";
import raceCare from "./racing-car.png"
import Image from "next/image";
export const Navbar = ({ category }: { category: Categories[] }) => {
  const [open, setOpen] = useState(false);
  const pathnameRout = usePathname();
  const { user }: any = useAuth() as UserProfile | null;
  const handleClick = () => {
    setOpen(!open);
  };
  const router = useRouter();

  const handelLogOut = async () => {
    await logOut();
    router.refresh();
  };

  const navLinkClass =
    "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-teal-500/20 hover:bg-teal-500/10 hover:text-gray-900";

  const activeNavClass =
    "border-teal-500/30 bg-teal-500/10 text-gray-900 ring-1 ring-teal-500/20";

  return (
    <nav className="fixed top-0  z-50 w-full ">
      <div className="  flex h-14 w-full items-center justify-between gap-2  border-white/10 bg-transparent px-3 shadow-none backdrop-blur-[2px] md:gap-3 md:px-5">
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <Link
            href="/"
            className=" flex  items-center gap-2  bg-linear-to-r from-zinc-900 via-zinc-800 to-teal-700 bg-clip-text text-sm font-bold tracking-tight text-transparent drop-shadow-sm md:text-base"
          >
           <span> Quickly Rent</span>
          </Link>
          <button
            type="button"
            onClick={handleClick}
            className="flex size-10 items-center justify-center rounded-xl border border-zinc-200/60 bg-white/80 text-zinc-800 shadow-sm transition-all duration-200 hover:border-teal-400/50 hover:bg-white hover:text-teal-800 md:size-10"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? (
              <X className="size-5 shrink-0" aria-hidden />
            ) : (
              <Menu className="size-5 shrink-0" aria-hidden />
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1 md:max-w-xl md:justify-self-center lg:max-w-2xl">
          <SearchResults />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          {user?.role ? (
            <form
              action={handelLogOut}
              className="relative flex items-center justify-end"
            >
              <DropDownUserInfo user={user} />
            </form>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-800 sm:gap-2 md:gap-3 md:text-sm">
              <Link
                href="/login"
                className="rounded-lg px-2 py-1.5 transition-colors hover:bg-white/60 hover:text-teal-700 md:px-2.5"
              >
                Login
              </Link>
              <span className="text-zinc-300" aria-hidden>
                |
              </span>
              <Link
                href="/register"
                className="rounded-lg px-2 py-1.5 transition-colors hover:bg-white/60 hover:text-teal-700 md:px-2.5"
              >
                <span className="sm:hidden">Register</span>
                <span className="hidden sm:inline">Create Account</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar — desktop & mobile */}
      <div
        className={`${open ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"} fixed left-0 top-14 z-40 flex h-[calc(100dvh-3.5rem)] w-[min(100%,22rem)] max-w-[min(100vw,22rem)] flex-col border-r border-teal-500/80 bg-linear-to-br from-gray-50 via-gray-50 to-teal-700 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out`}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="border-y border-teal-500/90 px-5 pb-4 pt-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-emerald-800 text-white shadow-lg shadow-teal-900/40">
                            <Image className=" p-0 m-0 " src={raceCare} alt="Logo" width={30} height={30} />

              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-500/90">
                  Marketplace
                </p>
                <p className="text-lg font-bold tracking-tight text-gray-900">Quickly Rent</p>
              </div>
            </div>
          </div>
          <ul className="no-scrollbar flex max-h-[calc(100dvh-14rem)] flex-col gap-0.5 overflow-y-auto px-3 py-4">
            <li>
              <Link
                href="/"
                className={`${navLinkClass} ${pathnameRout === "/" ? activeNavClass : ""}`}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            {user?.role === "ADMIN" ? (
              <li>
                <Link
                  href="/admin/users"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Users
                </Link>
              </li>
            ) : null}
            {user?.role === "ADMIN" ? (
              <li>
                <Link
                  href="/admin"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            ) : null}
            {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
              <li>
                <Link
                  href="/admin/products"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Vehicles
                </Link>
              </li>
            ) : null}
            {user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER" ? (
              <li>
                <Link
                  href="/admin/categories"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Brands
                </Link>
              </li>
            ) : null}
            {user?.role === "ADMIN" || user?.role === "ORDER_MANAGER" ? (
              <li>
                <Link
                  href="/admin/orders"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                href="/products"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                All Vehicles
              </Link>
            </li>
            {category?.map((Item, index) => (
              <li key={index}>
                <Link
                  href={`/products?categoryId=${Item.id}`}
                  className={`${navLinkClass} ${pathnameRout === Item.id ? activeNavClass : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {Item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-teal-500/90 bg-linear-to-br from-gray-50 to-teal-700  px-4 py-4">
          <div className="flex flex-col gap-3">
            {user?.role ? (
              <div className="flex items-center justify-between gap-2">
                <Link
                  onClick={() => setOpen(false)}
                  href="/me"
                  className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-2.5 py-2 transition-colors hover:border-teal-500/30 hover:bg-zinc-800"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-teal-600 to-zinc-800 text-sm font-semibold text-white">
                    {user?.name?.split("")[0]?.toUpperCase()}
                  </span>
                  <p className="truncate text-sm font-medium text-zinc-100">{user?.name}</p>
                </Link>
                <form action={handelLogOut} className="shrink-0">
                  <button
                    onClick={() => setOpen(false)}
                    type="submit"
                    className="rounded-xl cursor-pointer border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-200 transition-colors hover:bg-red-950/70"
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/login"
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-center text-sm font-medium text-zinc-100 transition-colors hover:border-teal-500/40 hover:text-teal-100"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-teal-600/50 bg-teal-950/40 px-3 py-2.5 text-center text-sm font-medium text-teal-100 transition-colors hover:bg-teal-900/50"
                  onClick={() => setOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-14 z-30 bg-zinc-950/55 backdrop-blur-[3px] transition-opacity duration-300 ease-out`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div className="w-full">
        {(!user?.role ||
          user?.role == "CUSTTOMER" ||
          user?.role == "ORDER_MANAGER" ||
          user?.role == "ADMIN") &&
        pathnameRout !== "/order" &&
        !pathnameRout.startsWith("/admin") ? (
          <Cart />
        ) : null}
      </div>
    </nav>
  );
};
