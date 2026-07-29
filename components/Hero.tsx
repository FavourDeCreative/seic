"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiOutlineArrowRight } from "react-icons/hi";

// Replace with your actual YouTube channel or live URL
const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@SalvationEmpireChurchIntl/streams";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const liveDotRef = useRef<HTMLSpanElement | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Check YouTube live status on mount and every 60 seconds
  useEffect(() => {
    let cancelled = false;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/youtube-live-status", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!cancelled) {
          setIsLive(Boolean(data?.isLive));
        }
      } catch {
        if (!cancelled) {
          setIsLive(false);
        }
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        clearProps: "opacity,transform",
      })
        .from(
          ".hero-title-line",
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            clearProps: "opacity,transform",
          },
          "-=0.4",
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            clearProps: "opacity,transform",
          },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            clearProps: "opacity,transform",
          },
          "-=0.4",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.6,
            clearProps: "opacity",
          },
          "-=0.2",
        );

      gsap.to(".hero-glow", {
        y: 30,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animate live indicator only while live
  useEffect(() => {
    if (!isLive || !liveDotRef.current) return;

    const tween = gsap.to(liveDotRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.2,
      ease: "power1.out",
      repeat: -1,
    });

    return () => tween.kill();
  }, [isLive]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(199,154,43,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(245,212,106,0.12),transparent_50%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#111111]" />

        <div className="hero-glow absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-yellow-500/20 blur-[100px]" />

        <div className="hero-glow absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F5D46A_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <span className="hero-badge mb-6 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 sm:text-sm">
          Welcome Home
        </span>

        <h1 className="overflow-hidden text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="hero-title-line block">
            A place to find{" "}
            <span className="italic text-yellow-500">grace</span>
          </span>

          <span className="hero-title-line block">and build community.</span>
        </h1>

        <p className="hero-subtitle mt-8 max-w-2xl text-base font-light text-gray-300 sm:text-lg md:text-xl">
          Salvation Empire Church International — City of Peace. Sharing love,
          hope, and faith with everyone who walks through our doors.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="hero-cta group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-4 text-base font-semibold text-black shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
          >
            Plan Your Visit
            <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {isLive ? (
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-red-500/20"
            >
              <span className="relative flex h-3 w-3">
                <span
                  ref={liveDotRef}
                  className="absolute inline-flex h-full w-full rounded-full bg-red-500"
                />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              We're Live on YouTube
            </a>
          ) : (
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-500/40 hover:bg-white/10"
            >
              <Image
                src="/img/youtube-icon.png"
                alt="YouTube"
                width={22}
                height={22}
                className="opacity-90"
              />
              Watch Previous Sermons
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-yellow-500" />
        </div>
      </div>

      <div className="absolute bottom-0 z-10 h-32 w-full bg-gradient-to-t from-[#111111] to-transparent" />
    </section>
  );
}
