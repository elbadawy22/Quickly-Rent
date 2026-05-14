import Link from "next/link";
import HomePage from "./(frontend)/components/HomePage/HomePage";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <HomePage />
        <section className="border  bg-linear-to-br from-zinc-900 via-zinc-800 to-teal-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Start ?
          </h2>
          <p className="mb-8 text-lg text-teal-100/90 md:text-xl">
            Join thousands of happy customers and discover your perfect Vehicles
            today
          </p>
          <Link
            href="/products"
            className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-zinc-900/20 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse All Vehicles
            <ArrowRight className="ml-2 size-5" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
