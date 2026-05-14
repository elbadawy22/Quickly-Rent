import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { UserProfile } from "../../lib/taypes"; 
import { getCurrentUser } from "../../lib/auth/currentUser";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserProfile = await getCurrentUser();

  if (!user ) {
    redirect("/login", "replace" as RedirectType);
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-zinc-100/90 via-white to-cyan-50/30">
      <div className="relative border-t border-white/50 bg-gradient-to-b from-white/30 via-transparent to-teal-50/15">
        {children}
      </div>
    </main>
  );
}
