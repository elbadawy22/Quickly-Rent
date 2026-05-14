"use client";
import { Handbag, MessageCircleWarning, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import { useAuth } from "../../providers/AuthProvider";
import { UserProfile } from "../../lib/taypes";
import { useState } from "react";
import raceCare from "./racing-car.png";
import Link from "next/link";
import { toast } from "react-toastify";
import { createNewOrder } from "../../lib/services/client/orders.services";
import { useRouter } from "next/navigation";
export default function OrderCheckOut() {
  const { items } = useCart();
  const { clearCart } = useCart();
  const { user }: any = useAuth() as UserProfile | null;
  const { removeItem } = useCart();
  const { addItem } = useCart();
  const { removequantity } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress||"No Data");
  const router = useRouter();

  const handelConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderItems = [] as {
      id: string;
      quantity: number;
    }[];
    items?.map((itm) =>
      orderItems.push({ id: itm.id, quantity: itm.quantity }),
    );

    if (
      deliveryAddress &&
      typeof deliveryAddress === "string" &&
      deliveryAddress !== ""
    ) {
      console.log({ name, phone, deliveryAddress, orderItems });
      const creater = await createNewOrder({
        name,
        phone,
        deliveryAddress,
        orderItems,
      });
      console.log(creater);

      if (creater.ok) {
        const success = await creater.json();
        toast.success(success.message);
        if (user?.role === "CUSTTOMER") {
          router.replace("/me/orders");
        } else {
          router.replace("/products");
        }
        clearCart();
      }
      if (!creater.ok) {
        const fail = await creater.json();
        toast.error(fail.message);
      }
    } else {
      toast.error("Your Address is Rquierd");
    }
  };
  return (
    <>
      {items.length > 0 ? (
        <div className="pt-10 mx-auto flex max-w-6xl flex-col bg-white px-4 py-6 sm:px-8 lg:px-10">
          <div className="mt-4 flex items-center justify-center gap-2 border-b border-zinc-200 pb-3">
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
            <h3 className="bg-linear-to-r from-zinc-900 to-teal-600 bg-clip-text text-center text-lg font-extrabold tracking-tight text-transparent">
              Your Order
            </h3>
          </div>
          <div className="grid max-h-[70vh] gap-4 overflow-y-auto border-b border-zinc-200 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* products cart */}

            {items.length > 0 ? (
              items?.map((item, i) => (
                <div
                  className="flex justify-between gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/50 px-3 py-4 shadow-sm"
                  key={i}
                >
                  <div className="flex max-w-full flex-col items-center gap-2 md:max-w-md md:flex-row md:items-start">
                    <Image
                      className="h-auto w-28 rounded-lg object-cover ring-1 ring-zinc-100"
                      src={item?.image[0]?.url}
                      alt={item?.name}
                      width={250}
                      height={250}
                    />
                    <div className="min-w-0 text-center md:text-left">
                      <div className="flex gap-2">
                        <h3 className="text-sm font-medium text-zinc-900">
                          {item?.name.slice(0, 25)}....
                        </h3>
                      </div>
                      <div className="mt-2 flex max-w-xs flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800 ring-1 ring-teal-100">
                          {item.category.name}
                        </span>
                        {/* <div className="ml-auto flex max-w-22 items-center overflow-hidden rounded-lg border border-zinc-200 bg-white text-xs font-bold text-zinc-900">
                          <span
                            onClick={() => removequantity(item)}
                            className="flex w-8 cursor-pointer items-center justify-center border-r border-zinc-200 bg-zinc-50 py-1 transition-colors hover:bg-red-50 hover:text-red-700"
                          >
                            -
                          </span>
                          <span className="flex min-w-8 flex-1 items-center justify-center px-1 py-1">
                            {item?.quantity}
                          </span>
                          <span
                            onClick={() => addItem(item)}
                            className="flex w-8 cursor-pointer items-center justify-center border-l border-zinc-200 bg-zinc-50 py-1 transition-colors hover:bg-teal-50 hover:text-teal-800"
                          >
                            +
                          </span>
                        </div> */}
                      </div>
                      <div className="mt-3 flex max-w-xs items-center justify-between gap-2">
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
                  />
                </div>
              ))
            ) : (
              <div className="px-3 py-6 text-center text-sm text-zinc-500">
                Create New Order...
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4">
              <h1 className="px-1 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Total:
              </h1>
              <div className="flex flex-wrap gap-8 px-2">
                <h3 className="font-bold">
                  <span className="text-zinc-600">Price: </span>
                  <span className="text-teal-700">
                    {" "}
                    $
                    {items
                      .reduce((item, i) => item + i.price * i.quantity, 0)
                      .toLocaleString()}
                  </span>
                </h3>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-6 pb-8">
            <form
              onSubmit={handelConfirm}
              className="mx-auto max-w-2xl space-y-4"
            >
              <div className="w-full">
                <h1 className="w-full text-center text-lg font-bold tracking-tight text-zinc-900">
                  Personal Data
                </h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {user?.role !== "CUSTTOMER".toUpperCase() ? (
                  <>
                    <div className="flex flex-1 flex-col gap-1">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-zinc-700"
                      >
                        Name:
                      </label>
                      <input
                        placeholder="Your name"
                        type="text"
                        name="name"
                        id="name"
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="true"
                        required
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-zinc-700"
                      >
                        Phone:
                      </label>
                      <input
                        placeholder="Your phone"
                        type="text"
                        name="phone"
                        id="phone"
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="true"
                        required
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2 flex w-full flex-col gap-1">
                <label
                  htmlFor="deliveryAddress"
                  className="text-sm font-medium text-zinc-700"
                >
                  Your Message:
                </label>
                <textarea
                  className="min-h-20 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  name="deliveryAddress"
                  id="deliveryAddress"
                  placeholder="Your Message"
                  defaultValue={user?.deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-6 flex w-full justify-center">
                <button
                  type="submit"
                  className="w-full max-w-xs cursor-pointer rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative m-auto flex pt-10 min-h-[50vh] w-full flex-col items-center justify-center gap-4 px-4  text-zinc-600">
          <h1 className="flex items-center gap-2 text-lg font-semibold text-zinc-800">
            <MessageCircleWarning
              className="size-6 text-amber-500"
              aria-hidden
            />
            No Order Data !..
          </h1>
          <Link
            href="/products"
            className="text-sm font-medium text-teal-700 underline-offset-4 transition hover:text-teal-600 hover:underline"
          >
            Add Vehicle
          </Link>
        </div>
      )}
    </>
  );
}
