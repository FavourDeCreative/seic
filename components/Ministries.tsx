"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineArrowRight,
} from "react-icons/hi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ministries = [
  {
    title: "City of Peace And Completeness Ministry",
    image: "/img/logo2.png",
    description:
      "Peace citizen, That is who i am",
    schedule: "Sundays, 9AM & 11AM",
  },
];

export default function Ministries() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".ministry-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ministries"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#faf9f6] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
              Get Involved
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#111111] sm:text-4xl md:text-5xl">
              Our Ministries
            </h2>
          </div>
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-[#111111]/15 px-6 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white sm:inline-flex"
          >
            Get Connected <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <div
                key={ministry.title}
                className="ministry-card group rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-yellow-500/20 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={ministry.image}
                    alt={ministry.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  {ministry.title}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-yellow-600">
                  {ministry.schedule}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {ministry.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-10 text-center sm:hidden">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 px-6 py-3 text-sm font-semibold text-[#111111]"
          >
            Get Connected <HiOutlineArrowRight />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
