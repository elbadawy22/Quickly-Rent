import { getProduct } from "@/app/(frontend)/lib/services/server/products.services";
import { Products } from "@/app/(frontend)/lib/taypes";
import Image from "next/image";
import AddCartBtn from "../AddCartBtn";
import ImageSwiper from "@/app/(frontend)/components/puplicUsed/ImageSwiper";

const ProductsDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const products: Products =
    (await getProduct(id).then((res) => res.json())) || [];

  return (
    <div className="flex w-full flex-col items-center bg-zinc-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl flex-col items-stretch gap-8 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm md:flex-row md:gap-10 md:p-8 lg:max-w-6xl">
        <div className="flex grow flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <ImageSwiper images={products.image} />
          </div>
          <div className="mt-3 flex max-w-[99%] justify-center gap-2 overflow-x-auto opacity-80">
            {products.image?.map((img, i) => (
              <Image
                src={img.url}
                alt={img.id}
                width={250}
                height={250}
                className="w-24 shrink-0 rounded-lg object-cover ring-1 ring-zinc-100"
                key={img.id}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:max-w-[50%] md:pl-4">
          <div className="space-y-2">
            {" "}
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{products.name}</h2>{" "}
            <span className="inline-block rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-100">
              {products?.category?.name}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-100 py-4">
            <span className="text-xl font-bold text-teal-700">
              ${products.price.toLocaleString()}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
              {products.stock} in stock
            </span>
          </div>
          <div className="my-6 flex w-full justify-stretch overflow-hidden rounded-xl">
            <AddCartBtn product={products} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-[99%] rounded-xl border border-zinc-200 bg-zinc-50/40 shadow-inner">
          <h3 className="border-b border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-800">
            Specifications:
          </h3>
          <pre className="wrap-normal overflow-x-auto p-4 px-5 text-sm leading-relaxed text-zinc-700">
            {products.description}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
