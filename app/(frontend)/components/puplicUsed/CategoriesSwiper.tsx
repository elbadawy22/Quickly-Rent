"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Iport Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import { Categories } from "../../lib/taypes";
import { useAuth } from "../../providers/AuthProvider";
import Link from "next/link";

export default function CategoriesSwiper() {
  const { category } = useAuth();

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={90}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {category && category?.length > 0 ? (
          category?.map((res: Categories) => (
            <SwiperSlide key={res.id} className="py-4 md:py-6">
              <Link
                href={`/products?categoryId=${res.id}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-100  px-6 py-6 shadow-md shadow-zinc-900/5 transition duration-300 hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-lg"
              >
                <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-zinc-50 ring-1 ring-zinc-100">
                  <Image
                    className="h-full w-full object-contain p-2"
                    src={res.images[0]?.url}
                    alt={res.images[0]?.id}
                    width={50}
                    height={50}
                  />
                </div>{" "}
                {/** Image */}
                <p className="w-full text-center text-xs font-medium text-zinc-800 sm:text-sm">
                  {res.name}
                </p>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide> 1 </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
