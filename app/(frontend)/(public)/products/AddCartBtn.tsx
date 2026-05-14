"use client";

import { toast } from "react-toastify";
import { Products } from "../../lib/taypes";
import { useCart } from "../../providers/CartProvider";

const AddCartBtn = ({ product }: { product: Products }) => {
  const { addItem } = useCart();
  const handelCart = (res: Products) => {
    addItem({ ...res, quantity: 1 });
    toast.success("Added Successfully");
  };
  return (
    <>
      {product.stock > 0 ? (
        <button
          onClick={() => handelCart(product)}
          className="w-full grow cursor-pointer rounded-b-lg bg-linear-to-r from-zinc-800 to-teal-700 py-2.5 text-sm font-semibold text-white shadow-inner transition hover:from-zinc-900 hover:to-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Booking Now
        </button>
      ) : (
        <button
          className="grow border-t border-zinc-200 pt-2 text-center text-sm font-medium text-red-700"
        >
          Not Available
        </button>
      )}
    </>
  );
};

export default AddCartBtn;
