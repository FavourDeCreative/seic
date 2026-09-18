"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowRight, HiOutlinePlayCircle } from "react-icons/hi2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Replace each youtubeId with your real sermon video's YouTube ID.
const sermons = [
  {
    id: 1,
    title: "The Prodigal's Return",
    series: "Parables of Jesus",
    duration: "45 mins",
    youtubeId: "z7SA0ejO5IE",
  },
  {
    id: 2,
    title: "Faith in the Fire",
    series: "Stand Firm",
    duration: "42 mins",
    youtubeId: "RIjlHMr_LJg",
  },
  {
    id: 3,
    title: "The Good Samaritan",
    series: "Parables of Jesus",
    duration: "38 mins",
    youtubeId: "ulqshwwbLeM",
  },
];

export default function Sermons() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".sermon-preview-card", {
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
      id="sermons"
      ref={sectionRef}
      className="scroll-mt-24 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
              Catch Up
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#111111] sm:text-4xl md:text-5xl">
              Recent Sermons
            </h2>
          </div>
          <Link
            href="/sermon"
            className="hidden items-center gap-2 rounded-full border border-[#111111]/15 px-6 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white sm:inline-flex"
          >
            See All Sermons <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sermons.map((sermon) => (
            <article
              key={sermon.id}
              className="sermon-preview-card group block overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#111111]">
                <iframe
                  src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                  title={sermon.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                  {sermon.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-yellow-600">
                  {sermon.series}
                </div>
                <h3 className="text-lg font-bold leading-tight text-[#111111] transition-colors group-hover:text-yellow-600">
                  {sermon.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/sermon"
            className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 px-6 py-3 text-sm font-semibold text-[#111111]"
          >
            See All Sermons <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
