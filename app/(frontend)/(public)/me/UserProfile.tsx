"use client";
import { ChevronRight, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { UsersDots } from "../../lib/taypes";
import { useAuth } from "../../providers/AuthProvider";
import { updateProfile } from "../../lib/services/client/me.services";
import Link from "next/link";

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UsersDots>(user);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<boolean>(false);
  console.log(user);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateProfile(e).then((res) => res);

    if (updated?.user) {
      setUserData(updated.user);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }
    setNameInput(false);
    setPasswordInput(false);
    setPhoneInput(false);
  };
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex w-full flex-col items-center justify-around gap-8 md:gap-8">
          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex w-full max-w-2xl flex-col gap-8 rounded-2xl border border-zinc-200/80 bg-white/90 py-8 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm md:gap-10"
          >
            <div className="flex w-full justify-center px-4">
              <div className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-teal-200/60 bg-gradient-to-br from-teal-600 to-zinc-800 text-7xl font-semibold text-white shadow-lg shadow-teal-900/25 sm:text-8xl">
                {userData?.name?.trim().charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div className="w-full px-4 sm:px-8">
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
                          setPasswordInput(false);
                          setPhoneInput(false);
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {nameInput ? (
                      <input
                        name="name"
                        type="text"
                        autoFocus
                        className="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        required
                        defaultValue={userData?.name}
                      />
                    ) : (
                      userData?.name || "N/A"
                    )}
                  </p>
                </div>
                <div className="mb-3 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Email</span>
                  </div>
                  <p className="mt-2 px-1 text-sm text-zinc-700">
                    {userData?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-3 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Phone</span>
                    {phoneInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                          {" "}
                          <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                        </button>
                        <span onClick={() => setPhoneInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                          <X className="size-4" aria-hidden />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setPasswordInput(false);
                          setPhoneInput(true);
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {phoneInput ? (
                      <input
                        name="phone"
                        type="text"
                        autoFocus
                        className="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        required
                        defaultValue={userData?.phone}
                      />
                    ) : (
                      userData?.phone || "N/A"
                    )}
                  </p>
                </div>
                <div className="mb-1 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Password</span>
                    {passwordInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                          {" "}
                          <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                        </button>
                        <span onClick={() => setPasswordInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                          <X className="size-4" aria-hidden />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setPasswordInput(true);
                          setPhoneInput(false);
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {passwordInput ? (
                      <input
                        type="password"
                        name="password"
                        autoFocus
                        className="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        required
                        placeholder="••••••••••••"
                      />
                    ) : (
                      "••••••••••••"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </form>
          <div className="grid w-full max-w-2xl grid-cols-1 gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-md shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm md:grid-cols-2 md:gap-4 md:p-6">
            {user?.role === "CUSTTOMER" ? (
              <Link
                href="/me/orders"
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-3.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-teal-300/50 hover:bg-teal-50/60 hover:shadow-md"
              >
                <p>My Orders</p>
                <ChevronRight className="size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700" aria-hidden />
              </Link>
            ) : (
              ""
            )}
            {user?.role === "PRODUCTS_MANAGER" || user?.role === "ADMIN"   ? (
              <>
                <Link
                  href="/me/products"
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-3.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-teal-300/50 hover:bg-teal-50/60 hover:shadow-md"
                >
                  <p>My Products</p>
                  <ChevronRight className="size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700" aria-hidden />
                </Link>
                <Link
                  href="/me/categories"
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-3.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-teal-300/50 hover:bg-teal-50/60 hover:shadow-md"
                >
                  <p>My Categories</p>
                  <ChevronRight className="size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700" aria-hidden />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
