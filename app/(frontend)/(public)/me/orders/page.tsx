"use client";

import { Orders } from "@/app/(frontend)/lib/taypes";
import { useAuth } from "@/app/(frontend)/providers/AuthProvider";
import Image from "next/image";

export default function page() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex w-full flex-col items-center bg-linear-to-b from-white/60 to-transparent py-12 sm:py-16">
        {user?.role === "CUSTTOMER" ? (
          <>
            <div className="flex w-full justify-center px-4 pb-6">
              <h1 className="w-full max-w-md border-y border-dashed border-zinc-200 py-3 text-center text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">My Orders</h1>
            </div>

            <div className="flex w-full max-w-3xl flex-col gap-6 px-4 sm:px-6">
              {user.orders?.map((order: Orders) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-md shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm sm:flex-row sm:items-stretch sm:gap-5 sm:p-5"
                >
                  <div
                    className="grid shrink-0 grid-cols-2 gap-1 self-start rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-2 shadow-inner sm:max-w-44"
                  >
                    {order.orderItems?.map((itm) => (
                      <Image
                        key={itm.product?.image[0]?.id}
                        src={itm.product?.image[0]?.url}
                        alt={itm.product?.image[0]?.id}
                        width={70}
                        height={70}
                        className="aspect-square w-full rounded-md object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 wrap-anywhere">
                    <div className="space-y-2 px-1">
                      <p className="text-sm text-zinc-800"><span className="font-semibold text-zinc-900">Order Id: </span>{order.id}</p>
                      <p
                        className={`inline-flex max-w-fit items-center rounded-full px-3 py-1 text-center text-xs font-medium ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/60"
                            : order.status === "CANCELED"
                              ? "bg-red-100 text-red-800 ring-1 ring-red-200/60"
                              : order.status === "PENDING"
                                ? "bg-amber-100 text-amber-900 ring-1 ring-amber-200/60"
                                : "bg-sky-100 text-sky-800 ring-1 ring-sky-200/60"
                        }`}
                      >
                        {order.status}
                      </p>
                      <p
                        className={`text-sm leading-relaxed ${
                          order.status === "DELIVERED"
                            ? " text-emerald-800"
                            : order.status === "CANCELED"
                              ? " text-red-800"
                              : order.status === "PENDING"
                                ? " text-amber-900"
                                : " text-sky-800"
                        }`}
                      >
                        {order.status === "DELIVERED"
                          ? "The order was completed and the car was returned."
                          : order.status === "CANCELED"
                            ? "Has been Cancelled"
                            : order.status === "PENDING"
                              ? "Waiting for Confirmation"
                              : "Confirmed...you can now pick up your car"}
                      </p>
                    </div>
                    <div className="border-t border-zinc-100 pt-2">
                      <span className="text-lg font-bold text-teal-700">
                        ${order?.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
