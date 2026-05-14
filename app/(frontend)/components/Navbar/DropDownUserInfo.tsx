"use client";
import { useState } from "react";
import { UserProfile } from "../../lib/taypes";
import {
  CircleUser,
  LogOut,
  MessageCircleQuestionMark,
} from "lucide-react";
import Link from "next/link";

const DropDownUserInfo = ({ user }: { user: UserProfile }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <button
        className="inline-flex cursor-pointer items-center justify-center text-zinc-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors bg-linear-to-r from-zinc-900 via-zinc-800 to-teal-700 text-gray-200  hover:bg-zinc-100">
          <p className="max-w-40 truncate text-sm font-medium  ">{user?.name}</p>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-zinc-600 to-teal-600 text-xs font-semibold text-white">
            {user?.name.split("")[0].toUpperCase()}
          </span>
        </div>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        hidden={open}
        className="absolute right-2 top-14 z-50 w-72 overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-900/10 md:right-4 md:top-12"
      >
        <div className="p-2">
          <div className="flex items-center space-x-2 rounded-lg border-b border-zinc-100 px-2.5 py-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-zinc-900">
              {" "}
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-zinc-600 to-teal-600 text-sm font-semibold text-white">
                {user?.name.split("")[0].toUpperCase()}
              </span>
              <p className="flex min-w-0 flex-col text-sm text-zinc-800">
                <span className="truncate px-0.5 font-semibold"> {user.name}</span>
                <span className="truncate text-xs text-zinc-500">
                  {user?.email}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ul className="px-2 pb-2 text-sm font-medium text-zinc-600">
          <li>
            <Link
              href="/me"
              className="inline-flex w-full items-center gap-2 rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              onClick={() => setOpen(true)}
            >
              <CircleUser className="size-4 shrink-0" />
              Account
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex w-full items-center gap-2 rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            >
              <MessageCircleQuestionMark className="size-4 shrink-0" />
              Help center
            </Link>
          </li>
          <li className="border-t border-zinc-100 pt-1.5">
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-red-700 transition-colors hover:bg-red-50"
            >
              <LogOut className="w-4" />
              Sign out
            </button>
          </li>
        </ul>
      </div>
      {!open ? (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpen(true)}
          aria-hidden
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DropDownUserInfo;
