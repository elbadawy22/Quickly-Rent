import { Categories, Products } from "../../lib/taypes";
import Link from "next/link";
import AddCartBtn from "../../(public)/products/AddCartBtn";
import ImageSwiper from "./ImageSwiper";
interface AllProducts extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}
const ProductsList = ({
  products,
}: {
  products: { data: AllProducts[]; count: number };
}) => {
  return (
      <div className="w-full grow">
      <div className="grid w-full grid-cols-2 gap-3 px-2 sm:grid-cols-2 sm:gap-4 sm:px-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {products && products?.data?.length > 0
          ? products?.data?.map((res: AllProducts) => (
              <div
                key={res.id}
                className="group flex max-w-full flex-col overflow-hidden rounded-xl border border-zinc-200/80  shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <Link
                  href={`products/${res.id}`}
                  className="flex flex-col items-center overflow-hidden rounded-t-xl"
                >
                  {res.image.length > 0 ? (
                    <ImageSwiper images={res.image} />
                  ) : (
                    ""
                  )}
                  <span className="w-full px-2 pt-2">
                    <span className="inline-block w-full truncate rounded-md bg-teal-50 px-2 py-1 text-center text-xs font-medium text-teal-800 ring-1 ring-teal-100">
                      {res.category?.name}
                    </span>
                  </span>
                </Link>
                <div className="flex flex-col gap-1 px-3 pb-2 pt-1">
                  <div className="flex items-baseline gap-1">
                    <h3 className="truncate text-sm font-semibold text-zinc-900 md:text-base">
                      {res.name?.slice(0, 15)}
                    </h3>
                    <span className="shrink-0 text-xs text-zinc-400">...</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <span className="text-sm font-bold text-teal-700 md:text-base">
                      ${res.price.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 md:text-xs">
                      <span>{res.stock}</span>
                      <span className="hidden sm:inline">Available</span>
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-center px-2 pb-3">
                  <AddCartBtn product={res} />
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ProductsList;
