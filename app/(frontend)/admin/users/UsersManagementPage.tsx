"use client";
import { useEffect, useState } from "react";
import { Eye, UserSearch, UserCog, UserPlus, Users, ShieldUser, UserPen, UserCheck } from "lucide-react";
import Link from "next/link";
import { getUsers } from "../../lib/services/client/users.services";
import { UsersDots } from "../../lib/taypes";
import UsersCharts from "../components/UsersCharts";
interface ChartsUsersData {
  totalUsers: number;
  guests: number;
  customers: number;
  admins: number;
  productsMang: number;
  ordersMang: number;
}
export default function UsersManagementPage() {
  const [filteredUsers, setFilteredUserss] = useState<UsersDots[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [count, setCount] = useState<number>(0);
  const [pageNumData, setPageNumData] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);
  const [charts, setCharts] = useState<ChartsUsersData>();

  useEffect(() => {
    getUsers(searchQuery, searchRole, pageNum)
      .then((res) => res.json())
      .then((res) => {
        setFilteredUserss(res.users);
        setCount(res.count);
        setPageNum(res.page);
        setPageNumData(res.countPagn);
        setCharts(res.chart);
      })
      .catch((err) => console.log(err?.message));
  }, [searchQuery, searchRole, pageNum]);

  return (
    <div className="p-6 md:pt-20 pt-15 min-h-screen bg-zinc-100 ">

      {/* Stats Cards */}
      <UsersCharts charts={charts} />

      {/* Filters */}
      <div className="  mb-6 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <Link
            href="users/create"
            className="flex max-w-xs items-center justify-center rounded-lg bg-teal-600 transition-colors hover:bg-teal-700"
          >
            <span className="w-full py-2 pl-3 text-sm font-semibold text-white md:py-0">
              Add New user
            </span>
            <div className="px-2 md:pr-2">
              <UserPlus className="size-5 text-white" aria-hidden />
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="rounded-l-lg border border-zinc-200 bg-zinc-900 p-2 pl-3">
                <UserSearch className="size-5 text-white" aria-hidden />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageNum(1);
                }}
                placeholder="Search by Name  or Phone..."
                className="w-full rounded-r-lg border border-l-0 border-zinc-200 bg-white py-2 pr-4 pl-3 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500/25"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1">
            <select
              id="role"
              name="role"
              autoComplete="role-name"
              className="shadow p-1  outline-gray-300 col-start-1 row-start-1 w-full appearance-none rounded-md   pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1  *:bg-gray-200 *:rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500/30 sm:text-sm/6"
              onChange={(e) => {
                setSearchRole(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="">All Roles</option>
              <option value="ADMIN" className="text-black">
                Admin
              </option>
              <option value="PRODUCTS_MANAGER" className="text-black">
                Products Manager
              </option>
              <option value="ORDER_MANAGER" className="text-black">
                Orders Manager
              </option>
            </select>

            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
            >
              <path
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  E-mail
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Created At
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Detalies
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="buser-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 font-semibold">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span>
                      {user.createdAt.split("T")[0].split("-")[2]}/
                      {user.createdAt.split("T")[0].split("-")[1]}/
                      {user.createdAt.split("T")[0].split("-")[0]}
                    </span>
                    {" @ "}
                    <span>{user.createdAt.split("T")[1].slice(0, 5)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "ORDER_MANAGER"
                          ? "bg-green-100 text-green-700"
                          : user.role === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : user.role === "PRODUCTS_MANAGER"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600  ">
                    <Link
                      href={`users/${user.id}`}
                      className="hover:bg-blue-200 w-full"
                    >
                      <Eye className="transform w-5 text-blue-500 hover:bg-blue-200 " />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {/* Showing {filteredUsers.length} of  orders.length orders */}
          </p>

          <div className="flex ">
            <button
              hidden={pageNum <= 1}
              className="px-3  py-1 cursor-pointer border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum - 1)}
            >
              Previous...
            </button>
            {Array.from({ length: Math.ceil(count / pageNumData) })?.map(
              (_, i) => (
                <div key={i}>
                  {i + 1 <= pageNum + 1 && i + 1 >= pageNum - 1 ? (
                    <button
                      value={i + 1}
                      className={`mx-0.5 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition ${pageNum == i + 1 ? "bg-zinc-900 text-white shadow-sm" : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"}`}
                      onClick={() => {
                        setPageNum(i + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  ) : null}
                </div>
              ),
            )}
            <button
              hidden={
                pageNum >= parseInt(Math.ceil(count / pageNumData).toString())
              }
              className="px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-50"
              onClick={(e) => setPageNum(pageNum + 1)}
            >
              ...Next
            </button>
          </div>
        </div>
      </div>
      <div className="mt-15 w-full h-5"></div>
    </div>
  );
}
