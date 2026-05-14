import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { UserProfile } from "../lib/taypes";
import { getCurrentUser } from "../lib/auth/currentUser";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserProfile = await getCurrentUser();

  if (
    user?.role === "ADMIN" ||
    user?.role === "PRODUCTS_MANAGER" ||
    user?.role === "ORDER_MANAGER"
  ) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-100/95 via-zinc-50/90 to-teal-50/35">
        <div className="relative min-h-[calc(100dvh-3.5rem)] border-t border-white/40 bg-gradient-to-b from-white/25 via-transparent to-teal-100/20">
          {children}
        </div>
      </main>
    );
  } else {
    redirect("/unauthorized", "replace" as RedirectType);
  }
}
