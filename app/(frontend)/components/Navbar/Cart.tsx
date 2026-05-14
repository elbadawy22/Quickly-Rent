"use client";

import { Handbag, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import raceCare from "./racing-car.png";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { items } = useCart();
  const { removeItem } = useCart();
  const { addItem } = useCart();
  const { removequantity } = useCart();

  return (
    <>
      <div className="fixed bottom-8 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-zinc-200 text-white shadow-lg shadow-zinc-900/30 ring-2 ring-white/90 transition-transform hover:scale-105 md:bottom-10 md:right-8">
        <div
          className="relative flex cursor-pointer flex-col items-center justify-center transition-transform"
          onClick={() => setOpen(!open)}
        >
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-bold text-white">
            {items.length || 0}
          </span>
          <Image
            className=" p-0 m-0 "
            src={raceCare}
            alt="Logo"
            width={40}
            height={30}
          />
        </div>
      </div>

      <>
        <div
          className={`${open ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-50 flex h-dvh w-[min(100%,22rem)] max-w-[90vw] flex-col border-l border-zinc-200/90 bg-zinc-50 px-5 shadow-2xl shadow-zinc-900/15 transition-transform duration-300 ease-out`}
        >
          <div className="mt-6 flex items-center justify-center gap-2 border-b border-zinc-200 pb-3">
            {items.length > 0 ? (
              <span className="flex size-6 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                {items.length}
              </span>
            ) : (
              ""
            )}
            <Image
              className=" p-0 m-0 "
              src={raceCare}
              alt="Logo"
              width={40}
              height={30}
            />
            <h3 className="bg-linear-to-r from-zinc-900 to-teal-600 bg-clip-text text-center text-lg font-bold tracking-tight text-transparent">
              Your Order
            </h3>
          </div>
          <div className="flex max-h-[65vh] flex-col overflow-y-auto border-b border-zinc-100">
            {/* products cart */}

            {items.length > 0 ? (
              items?.map((item, i) => (
                <div
                  className="flex justify-between gap-2 border-b border-zinc-100 py-3"
                  key={i}
                >
                  <div className="flex max-w-[85%] flex-col gap-2 md:flex-row md:max-w-full">
                    <Image
                      className="h-auto w-24 shrink-0 rounded-lg object-cover ring-1 ring-zinc-100"
                      src={item?.image[0]?.url}
                      alt={item?.name}
                      width={250}
                      height={250}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex gap-2">
                        <h3 className="truncate text-sm font-medium text-zinc-900">
                          {item?.name}
                        </h3>
                      </div>
                      {/* <div className="mt-1 flex max-w-xs flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800 ring-1 ring-teal-100">
                          {item.category.name}
                        </span>
                        <div className="flex items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-900">
                          <span
                            onClick={() => removequantity(item)}
                            className="flex w-8 cursor-pointer items-center justify-center border-r border-zinc-200 bg-white py-1 transition-colors hover:bg-red-50 hover:text-red-700"
                          >
                            -
                          </span>
                          <span className="flex min-w-8 items-center justify-center px-2 py-1">
                            {item?.quantity}
                          </span>
                          <span
                            onClick={() => addItem(item)}
                            className="flex w-8 cursor-pointer items-center justify-center border-l border-zinc-200 bg-white py-1 transition-colors hover:bg-teal-50 hover:text-teal-800"
                          >
                            +
                          </span>
                        </div>
                      </div> */}
                      <div className="mt-2 flex max-w-xs items-center justify-between gap-2">
                        <span className="text-sm font-bold text-teal-700">
                          ${item.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-medium text-zinc-500">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                  <X
                    onClick={() => removeItem(item.id)}
                    className="size-5 shrink-0 cursor-pointer text-zinc-400 transition-colors hover:text-red-600"
                    aria-label="Remove item"
                  />
                </div>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-zinc-500">
                Create a new booking...
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <div className="flex flex-col gap-3 pt-4">
              <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Total
              </h2>
              <div className="flex flex-wrap gap-6 px-1">
                <h3 className="text-sm font-bold">
                  <span className="text-zinc-600">Price: </span>
                  <span className="text-teal-700">
                    {" "}
                    $
                    {items
                      .reduce((item, i) => item + i.price * i.quantity, 0)
                      .toLocaleString()}
                  </span>
                </h3>
                {/* <h4 className="text-sm font-bold">
                  <span className="text-zinc-600">Items: </span>
                  {items.reduce((item, i) => item + i.quantity, 0)}
                </h4> */}
              </div>
              <div className="flex w-full justify-center p-2">
                <Link
                  onClick={() => setOpen(false)}
                  href="/order"
                  className="w-full max-w-xs cursor-pointer rounded-xl bg-zinc-900 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-zinc-800"
                >
                  Checkout
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => setOpen(false)}
          className={`${open ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-[2px] transition-opacity duration-200`}
          aria-hidden
        />
      </>
    </>
  );
};

export default Cart;
