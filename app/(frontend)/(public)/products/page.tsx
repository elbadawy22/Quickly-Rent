import { getProducts } from "../../lib/services/server/products.services";
import ProductsList from "../../components/puplicUsed/ProductsList";
import { Categories, Products, SearchParamsProducts } from "../../lib/taypes";
import FilteringProducts from "./FilteringProducts";
import CategoriesSwiper from "../../components/puplicUsed/CategoriesSwiper";
import Pagination from "../../components/puplicUsed/Pagination";

interface ProductsPage extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}
const ProductsPage = async ({
  searchParams,
}: {
  [key: string]: string | string[];
}) => {
  const params = (await searchParams) as SearchParamsProducts;

  const products: { data: ProductsPage[]; count: number ,page: number,countPagn:number} =
    (await getProducts(params).then((res) => res.json())) || [];
  return (
    <>
      <div className="flex w-full flex-col items-center pt-10 bg-zinc-50/80">
        <div className="mt-2 flex w-full max-w-7xl flex-col items-center gap-6 md:mt-6">
          <div className="w-full flex justify-center">
            <CategoriesSwiper />
          </div>
          <div className="flex w-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-sm md:w-[95%] md:flex-row md:gap-4 md:p-4">
            <FilteringProducts />
            <div className="z-0">
              <ProductsList products={products} />
            </div>
          </div>
            <div className="mt-4 w-full border-t border-zinc-100 pt-2">
              <Pagination count={products.count} page={products.page} countPagn={products.countPagn}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
