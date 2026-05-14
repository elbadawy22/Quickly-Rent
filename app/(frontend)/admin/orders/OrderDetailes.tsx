"use client";

import { Edit, Eye, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Categories, Orders, Products, UsersDots } from "../../lib/taypes";
import { updateUser } from "../../lib/services/client/users.services";
import DeleteUser from "./DeleteOrder";
import { updateOrder } from "../../lib/services/client/orders.services";
import Link from "next/link";
import Image from "next/image";
interface UserDetailesDots extends UsersDots {
  products?: Products[];
  categories?: Categories[];
  orders?: [];
}

const UserDetailes = ({ order }: { order: Orders }) => {
  const [orderData, setOrderData] = useState<Orders>(order);
  const [roleInput, setRoleInput] = useState<boolean>(false);

  const handelSubmit = async (e: FormData) => {
    const updated = await updateOrder(e, order.id).then((res) => res);

    if (updated?.order) {
      setOrderData(updated.order);
      toast.success(updated.message, { className: "bg-white" });
    } else {
      toast.error(updated?.message);
    }

    setRoleInput(false);
  };
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex w-full flex-col items-center justify-around gap-8 md:gap-10">
          {/*  user Image */}

          {/* User personal data and edit data form */}
          <form
            action={handelSubmit}
            className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-200/80 bg-white/90 py-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm md:flex-row md:gap-10 md:py-8"
          >
            <div className="w-full px-4 sm:px-6">
              <h3 className="mb-6 w-full border-b border-zinc-100 pb-4 text-center text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl" >Order Detailes</h3>
              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                <div className="border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500"> Name</span>
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {order.user?.name || order.guestOrderInfo?.name}
                  </p>
                </div>
                <div className="border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500"> Email</span>
                  </div>
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {order.user?.email || "Guests Customers"}
                  </p>
                </div>
                <div className="border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Phone</span>
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm text-zinc-800">
                    {order.user?.phone || order.guestOrderInfo?.phone}
                  </p>
                </div>
                <div className="border-b border-zinc-200/90 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Total Price</span>
                  </div>{" "}
                  <p className="mt-2 px-1 text-sm font-semibold text-teal-800">
                    ${order.totalPrice || 0}
                  </p>
                </div>
                <div className="border-b border-zinc-200/90 pb-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Statu</span>
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
                          setRoleInput(true);
                        }}
                        className="size-4 cursor-pointer text-zinc-400 transition hover:text-teal-600"
                      />
                    )}
                  </div>{" "}
                  <div className="mt-2 px-1 text-sm text-zinc-800">
                    {roleInput ? (
                      <div className="grid grid-cols-1">
                        <select
                          name="status"
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 *:rounded-md *:bg-zinc-50"
                          required
                          defaultValue={orderData?.status}
                        >
                          <option value="" className=" disabled ">
                            Choose Statu...
                          </option>
                          <option value="CONFIRMED" className="text-black ">
                            CONFIRMED
                          </option>
                          <option value="DELIVERED" className="text-black">
                            DELIVERED
                          </option>
                          <option value="CANCELED" className="text-black">
                            CANCELED
                          </option>
                        </select>
                      </div>
                    ) : (
                      orderData?.status || "N/A"
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 border-b border-zinc-200/90 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">The Address</span>
                </div>{" "}
                <p className="mt-2 px-1 text-sm leading-relaxed text-zinc-700">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-10 w-full rounded-2xl border border-zinc-200/80 bg-white/85 shadow-md shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition-all duration-100">
          <div className="flex items-center justify-center gap-10"></div>
          {/* Products */}
          {orderData?.orderItems && orderData.orderItems?.length > 0 ? (
            <div className="overflow-hidden rounded-2xl px-3 py-6 sm:px-5">
              <div className="grid w-full grid-cols-2 gap-3 gap-x-2 gap-y-6 rounded-xl bg-gradient-to-b from-zinc-50/50 to-white px-2 py-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {orderData?.orderItems?.map((itm) => (
                  <Link href={`/products/${itm.product.id}`} key={itm.id}>
                    <div className="group w-full overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-900/5 transition hover:border-teal-300/60 hover:shadow-md">
                      <div className="flex flex-col items-center overflow-hidden rounded-t-xl">
                        {itm.product.image?.length > 0 ? (
                          <Image
                            className="h-auto w-full cursor-pointer object-cover transition duration-200 group-hover:scale-[1.02]"
                            width={250}
                            height={250}
                            src={itm.product.image[0].url}
                            alt={itm.product.image[0].id}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex flex-col gap-1 px-3 py-3">
                        <div className="flex items-center">
                          <h3 className="overflow-x-hidden text-sm font-bold text-slate-800 md:text-base">
                            {itm.product.name.slice(0, 20)}
                            {itm.product.name.length > 20 ? (
                              <span className="text-xs font-normal text-zinc-400">
                                ....more
                              </span>
                            ) : (
                              ""
                            )}
                          </h3>
                        </div>
                        <div className="flex items-end">
                          <h3 className="overflow-x-hidden pl-1 text-sm font-bold text-slate-500 md:text-base"></h3>
                        </div>

                        <div className="flex flex-col gap-0.5 pb-1">
                          <span className="flex items-center gap-1 text-[8px] text-red-700">
                            <span className="text-[10px]">
                              {itm.product.stock}
                            </span>{" "}
                            <span>in stoke</span>
                          </span>
                          <span className="text-xs font-bold text-teal-700 md:text-sm">
                            ${itm.product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DeleteUser order={orderData} />
    </section>
  );
};

export default UserDetailes;
