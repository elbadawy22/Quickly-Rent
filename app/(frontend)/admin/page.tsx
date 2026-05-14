import { getUsers } from "../lib/services/server/users.services";
import UsersCharts from "./components/UsersCharts";
import { getOrdrs } from "../lib/services/server/orders.services";
import OrdersCharts from "./components/OrdersCharts";
import { getProducts } from "../lib/services/server/products.services";
import ProductCategory from "./components/ProductCategory";
import { getCategories } from "../lib/services/server/categories.services";
import OrderChartColor from "./components/OrderChartColor";
import UserChartColor from "./components/UserChartColor";
import SalesOverviewChart from "./components/SalesOverviewChart";
import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../lib/auth/currentUser";
import { UserProfile } from "../lib/taypes";

export default async function page() {
  const user: UserProfile = await getCurrentUser();

  if (user?.role === "ADMIN") {
  } else {
    return redirect("/unauthorized", "replace" as RedirectType);
  }
  const users = await getUsers().then((res) => res.json());
  const orders = await getOrdrs().then((res) => res.json());
  const products = await getProducts({}).then((res) => res.json());
  const categories = await getCategories();
  return (
    <div className="min-h-screen pt-10 bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="px-1 py-4 text-2xl font-bold tracking-tight text-zinc-900">
        {" "}
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        <div>
          <UserChartColor charts={users.chart} />
        </div>
        <div>
          <SalesOverviewChart />
        </div>
        <div>
          <OrderChartColor order={orders.charts} />
        </div>
      </div>
      <div className="px-1 md:px-4 lg:px-6">
        <p className="w-full px-2 py-2 text-lg font-semibold text-zinc-800">Users:</p>
        <UsersCharts charts={users.chart} />
      </div>
      <div className="px-1 md:px-4 lg:px-6">
        <p className="w-full px-2 py-2 text-lg font-semibold text-zinc-800"> Orders:</p>
        <OrdersCharts charts={orders.charts} count={orders.count} />
      </div>
      <div className="px-1 md:px-4 lg:px-6">
        <p className="w-full px-2 py-2 text-lg font-semibold text-zinc-800">
          {" "}
          Categories & Products:
        </p>
        <ProductCategory
          product={products.count}
          category={categories.length}
        />
      </div>
    </div>
  );
}
