"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_SLIDES = [
  {
    src: "https://www.resadz.com/storage/hero-slides/01KKS8DX5TGF7FC7GBQ4QWBKWW.webp",
    alt: "Luxury sports car on an open road at dusk",
  },
  {
    src: "https://www.resadz.com/storage/hero-slides/01KKS8NDRD6MMMT7RD2N2CBA7Z.webp",
    alt: "Performance car on a desert highway",
  },
  {
    src: "https://www.resadz.com/storage/hero-slides/01KKS8WS7MBEESCR04TJ5YHWZ6.webp",
    alt: "Cars on a city street at night",
  },
  {
    src: "https://www.resadz.com/storage/hero-slides/01KKS8Z3MEJMC7DY0FSYKN5MM4.webp",
    alt: "Car on a scenic green mountain road",
  },
] as const;

export default function SwiperHeroHome() {
  return (
    <section className="  relative w-full min-h-[min(100vh,800px)] overflow-hidden bg-zinc-950">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        className="absolute inset-0 h-full w-full"
        aria-label="Featured automotive imagery"
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide
            key={slide.src}
            className="relative h-full! min-h-[min(92vh,900px)]"
          >
            <div className="absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="scale-105 object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/35"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-linear-to-r from-zinc-950/50 via-transparent to-zinc-950/40"
                aria-hidden
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-2 flex min-h-[min(92vh,900px)] flex-col items-center justify-center px-4 pt-6 pb-16 text-center sm:px-8 md:pb-20">
        <div className="pointer-events-auto max-w-4xl">
          <h1 className=" flex flex-col  text-start text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-3xl md:text-4xl ">
            <span> Développez votre activité en rejoignant ResaDz.</span>
            <span className="text-teal-600">
              Offrez à votre activité plus de visibilité, plus de clients et
              plus de structure.
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-xl shadow-black/25 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View all Vehicles
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
