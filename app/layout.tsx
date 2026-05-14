import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./(frontend)/components/Navbar/Navbar";
import { Categories, UserProfile } from "./(frontend)/lib/taypes";
import { getCurrentUser } from "./(frontend)/lib/auth/currentUser";
import { getCategories } from "./(frontend)/lib/services/server/categories.services";
import { AuthProvider } from "./(frontend)/providers/AuthProvider";
import { CartProvider } from "./(frontend)/providers/CartProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quickly Rent",
  description: "Rayz Shop Ecommerce Website",
  icons:"@/app/(frontend)/components/Navbar/racing-car.png"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserProfile = await getCurrentUser();
  const category: Categories[] = await getCategories();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-dvh bg-linear-to-b from-zinc-100 via-white to-teal-50/40 antialiased`}
      >
        <AuthProvider user={user} category={category}>
          <CartProvider>
            <Navbar category={category} />
            <main className="relative isolate pb-10 ">
              <ToastContainer
                position="bottom-left"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover={true}
                draggable={true}
                theme="light"
                className="z-9999"
              />
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
