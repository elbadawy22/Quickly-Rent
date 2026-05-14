import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProducts } from "../../lib/services/server/products.services";
import { Categories, Products } from "../../lib/taypes";
import SwiperHeroHome from "./SwiperHeroHome";
import CategoriesSwiper from "../puplicUsed/CategoriesSwiper";
import ProductsList from "../puplicUsed/ProductsList";

interface AllProducts extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}

const HomePage = async () => {
  const products: { data: AllProducts[]; count: number } =
    (await getProducts({}).then((res) => res.json())) || [];

  return (
    <div className="  ">
      <div className="overflow-hidden">
        <SwiperHeroHome />
      </div>
      <div className="bg-linear-to-br to-gray-50 via-gray-50 from-teal-800">
        <div className="px-4 pt-2 sm:px-6 lg:px-8">
          <CategoriesSwiper />
        </div>
        <div className="flex items-center justify-center py-8 sm:py-10">
          <div className="z-0 w-full max-w-7xl md:px-6 lg:px-8">
            <ProductsList products={products} />
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-zinc-200/80" aria-hidden />
  
    </div>
  );
};

export default HomePage;
