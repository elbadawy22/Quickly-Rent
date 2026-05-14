"use client";
import { createNewUser } from "@/app/(frontend)/lib/services/client/users.services";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateUsers = () => {
  const router  = useRouter()
  const handelAction = async (e: FormData) => {
  const creater = await createNewUser(e);
  if (creater.ok) {
    const success = await creater.json();
    toast.success(success.message);
    router.replace("/admin/users")
  }
  if (!creater.ok) {
    const fail = await creater.json();
    toast.error(fail.message);
  }
};
  return (
    <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl justify-center">
        <div className="w-full rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-900/5 backdrop-blur-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
          <UserPlus className="size-5 shrink-0 text-teal-600" aria-hidden />
          Create A New User</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Push a new user to manage your app
          </p>

          <form action={handelAction} className="mt-8 w-full">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jone Dou"
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="0123456789"
                    autoComplete="given-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    autoComplete="family-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    autoComplete="family-name"
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="role" className="block text-sm font-medium text-zinc-700">
                  Role
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="role"
                    name="role"
                    autoComplete="role-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-xl border border-zinc-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-zinc-800 shadow-sm outline-none transition-[border-color,box-shadow] *:rounded-md *:bg-zinc-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  >
                    <option className=" disabled ">Choose Role...</option>
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
                    className="pointer-events-none col-start-1 row-start-1 mr-2.5 size-5 self-center justify-self-end text-zinc-400 sm:size-4"
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
            <div className="mt-10 flex w-full justify-center">
              <button
                type="submit"
                className="w-full max-w-xs cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:from-teal-500 hover:to-cyan-600 hover:shadow-teal-900/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateUsers;
