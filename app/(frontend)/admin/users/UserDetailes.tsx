"use client";

import { Edit, Eye, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Categories, Products, UsersDots } from "../../lib/taypes";
import { updateUser } from "../../lib/services/client/users.services";
import DeleteUser from "./DeleteUser";


const UserDetailes = ({ user }: { user: UsersDots }) => {
  const [userData, setUserData] = useState<UsersDots>(user);
  const [nameInput, setNameInput] = useState<boolean>(false);
  const [roleInput, setRoleInput] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<boolean>(false);
  const [togelOrders, setTogelOrders] = useState<boolean>(false);
  const [togelCategories, setTogelCategories] = useState<boolean>(false);
  const [togelProducts, setTogelProducts] = useState<boolean>(false);
  const handelSubmit = async (e: FormData) => {
    const updated = await updateUser(e, user.id).then((res) => res);

    if (updated?.user) {
      setUserData(updated.user);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }

    setNameInput(false);
    setPasswordInput(false);
    setRoleInput(false);
    setPhoneInput(false);
  };
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex w-full flex-col items-center justify-around gap-8 md:flex-row md:gap-12">
          {/*  user Image */}

          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-200/80 bg-white/90 py-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm md:flex-row md:gap-10 md:py-8"
          >
            <div className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-teal-200/60 bg-gradient-to-br from-teal-600 to-zinc-800 text-7xl font-semibold text-white shadow-lg shadow-teal-900/25 sm:text-8xl">
              {userData?.name?.trim().charAt(0).toUpperCase() || "U"}
            </div>
            <div className="w-full px-4 md:w-auto md:max-w-md md:px-6">
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
                          setRoleInput(false);
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
                        className="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-teal-500/20 focus:border-teal-500 focus:ring-2"
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
                          setRoleInput(false);
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
                <div className="mb-3 border-b border-zinc-200/90 pb-3">
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
                          setRoleInput(false);
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
              <div className="flex flex-col">
                <div className="mb-1 border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Role</span>
                    {roleInput ? (
                      <div className="flex items-center gap-1">
                        <button type="submit" className="rounded-lg p-1 text-zinc-500 transition hover:bg-teal-50 hover:text-teal-700">
                          {" "}
                          <Save className="size-4 cursor-pointer" aria-hidden />{" "}
                        </button>
                        <span onClick={() => setRoleInput(false)} className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                          <X className="size-4" aria-hidden />
                        </span>
                      </div>
                    ) : (
                      <Edit
                        onClick={() => {
                          setNameInput(false);
                          setPasswordInput(false);
                          setRoleInput(true);
                          setPhoneInput(false);
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <div className="mt-2 px-1 text-sm text-zinc-800">
                    {roleInput ? (
                      <div className="grid grid-cols-1">
                        <select
                          name="role"
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 *:rounded-md *:bg-zinc-50"
                          required
                          defaultValue={userData?.role}
                        >
                          <option value="" className=" disabled ">
                            Choose Role...
                          </option>
                          <option value="ADMIN" className="text-black ">
                            Admin
                          </option>
                          <option
                            value="PRODUCTS_MANAGER"
                            className="text-black"
                          >
                            Products Manager
                          </option>
                          <option value="ORDER_MANAGER" className="text-black">
                            Orders Manager
                          </option>
                        </select>
                      </div>
                    ) : (
                      userData?.role || "N/A"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-10 w-full rounded-2xl border border-zinc-200/80 bg-white/80 shadow-md shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition-all duration-100">
          <div className="flex flex-wrap items-center justify-center gap-4 border-b border-zinc-100 px-4 py-3 sm:gap-8">
            {user.orders && user.orders?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(false);
                  setTogelProducts(false);
                  setTogelOrders(true);
                }}
                className={`cursor-pointer border-b-2 pb-2 text-lg font-semibold tracking-tight transition-colors sm:text-2xl ${togelOrders ? "border-teal-600 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
              >
                <h2 className="text-inherit">Orders</h2>
              </div>
            ) : (
              ""
            )}
            {user.products && user.products?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(false);
                  setTogelProducts(true);
                  setTogelOrders(false);
                }}
                className={`cursor-pointer border-b-2 pb-2 text-lg font-semibold tracking-tight transition-colors sm:text-2xl ${togelProducts ? "border-teal-600 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
              >
                <h2 className="text-inherit">Products</h2>
              </div>
            ) : (
              ""
            )}
            {user.categories && user.categories?.length > 0 ? (
              <div
                onClick={() => {
                  setTogelCategories(true);
                  setTogelProducts(false);
                  setTogelOrders(false);
                }}
                className={`cursor-pointer border-b-2 pb-2 text-lg font-semibold tracking-tight transition-colors sm:text-2xl ${togelCategories ? "border-teal-600 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
              >
                <h2 className="text-inherit">Categories</h2>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Products */}
          {togelProducts ? (
            <div className="overflow-hidden rounded-b-2xl px-3 py-4 sm:px-5">
              <div className="overflow-x-auto rounded-xl border border-zinc-200/80">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead className="bg-gradient-to-r from-zinc-50 to-teal-50/40">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Price
                      </th>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Stock
                      </th>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Created At
                      </th>

                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 bg-white">
                    {user.products?.map((product) => (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-teal-50/40"
                      >
                        <td className="px-4 py-3 font-medium text-zinc-900">{product.name}</td>
                        <td className="px-4 py-3 font-semibold text-teal-800">
                          {product.price}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {product.stock}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          <span>
                            {user.createdAt.split("T")[0].split("-")[2]}/
                            {user.createdAt.split("T")[0].split("-")[1]}/
                            {user.createdAt.split("T")[0].split("-")[0]}
                          </span>
                          {" @ "}
                          <span>
                            {product.createdAt.split("T")[1].slice(0, 5)}
                          </span>
                        </td>
                        <td className="max-w-xs px-4 py-3 text-zinc-600">{product.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}

          {/* Categories */}
          {togelCategories ? (
            <div className="overflow-hidden rounded-b-2xl px-3 py-4 sm:px-5">
              <div className="overflow-x-auto rounded-xl border border-zinc-200/80">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead className="bg-gradient-to-r from-zinc-50 to-teal-50/40">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Name
                      </th>

                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Stock
                      </th>
                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Created At
                      </th>

                      <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 bg-white">
                    {user.categories?.map((category) => (
                      <tr
                        key={category.id}
                        className="transition-colors hover:bg-teal-50/40"
                      >
                        <td className="px-4 py-3 font-medium text-zinc-900">{category.name}</td>

                        <td className="px-4 py-3 text-zinc-600">
                          {category.stock}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          <span>
                            {user.createdAt.split("T")[0].split("-")[2]}/
                            {user.createdAt.split("T")[0].split("-")[1]}/
                            {user.createdAt.split("T")[0].split("-")[0]}
                          </span>
                          {" @ "}
                          <span>
                            {category.createdAt.split("T")[1].slice(0, 5)}
                          </span>
                        </td>
                        <td className="max-w-xs px-4 py-3 text-zinc-600">{category.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DeleteUser user={user} />
    </section>
  );
};

export default UserDetailes;
