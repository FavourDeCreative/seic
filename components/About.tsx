"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineBookOpen,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
} from "react-icons/hi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    title: "Grounded in Truth",
    icon: HiOutlineBookOpen,
    description:
      "We believe the Bible is God's inspired word and our guide for faith and life.",
  },
  {
    title: "Rooted in Grace",
    icon: HiOutlineHeart,
    description:
      "We're all broken people in need of a Savior, saved only by God's unmerited favor.",
  },
  {
    title: "Growing in Spirit",
    icon: HiOutlineLightBulb,
    description:
      "We pursue ongoing transformation through the Holy Spirit, becoming more like Jesus.",
  },
  {
    title: "Gathered in Community",
    icon: HiOutlineUserGroup,
    description:
      "We do life together — authentic relationships, carrying one another's burdens.",
  },
];

const team = [
  { name: "Prophet Original", role: "Lead Pastor" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ".about-intro", start: "top 75%" },
      });

      gsap.from(".about-content > *", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ".about-intro", start: "top 75%" },
      });

      gsap.from(".value-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
      });

      gsap.from(".team-card", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ".team-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 bg-white">
      {/* ================= Story + Image ================= */}
      <div className="about-intro py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-20">
          <div className="about-image relative w-full lg:w-1/2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#111111] shadow-2xl">
              <Image
                src="/img/p1.jpg"
                alt="Our church community gathered in worship"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,154,43,0.25),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl" />
          </div>

          <div className="about-content w-full lg:w-1/2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#111111] sm:text-4xl md:text-5xl">
              You belong here.
            </h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-yellow-500" />

            <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-600 sm:text-lg">
              <p>
                Salvation Empire Church International — City of Peace — began as
                a small group of believers united by a desire for authentic
                community and biblical teaching in our city. Whether you&apos;re
                exploring faith for the first time or looking for a church to
                call home, we&apos;re glad you found us.
              </p>
              <p>
                Our mission is simple: to make disciples of Jesus Christ who
                love God, love people, and serve the world — a church where the
                hurting find healing, the searching find truth, and believers
                are equipped to carry the gospel into their homes and
                communities.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xl font-semibold text-[#111111]">
               Prophet Original
              </p>
              <p className="text-sm uppercase tracking-widest text-yellow-600">
                Lead Pastor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Core Values ================= */}
      <div className="bg-[#faf9f6] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
              What We Believe
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#111111] sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="values-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="value-card rounded-2xl bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= Leadership (compact strip) ================= */}
      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              Our Leadership Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Meet the pastors and directors dedicated to serving our church
              family.
            </p>
          </div>

          <div className="team-grid grid grid-cols-2 gap-8 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="team-card text-center">
                <div className="mx-auto flex aspect-square w-full max-w-[160px] items-center justify-center rounded-full border-4 border-yellow-500/20 bg-gradient-to-br from-[#111111] to-[#2a2a2a] text-2xl font-bold text-yellow-500/40">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#111111]">
                  {member.name}
                </h3>
                <p className="text-xs font-medium uppercase tracking-wider text-yellow-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
