"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlinePaperAirplane,
} from "react-icons/hi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const info = [
  {
    icon: HiOutlineLocationMarker,
    title: "Our Location",
    lines: ["12 Salvation Way", "Lagos, Nigeria"],
  },
  {
    icon: HiOutlinePhone,
    title: "Phone",
    lines: ["+234 800 000 0000", "Office Hours: Mon–Thu, 9am–4pm"],
  },
  {
    icon: HiOutlineMail,
    title: "Email",
    lines: ["hello@salvationempire.org"],
  },
  {
    icon: HiOutlineClock,
    title: "Service Times",
    lines: ["Sunday: 9:00 AM & 11:00 AM", "Wednesday: 7:00 PM"],
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-info-item", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        x: 20,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-24 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#111111] sm:text-4xl md:text-5xl">
            We&apos;d Love to Hear From You
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <div className="space-y-6">
              {info.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="contact-info-item flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111111]">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-gray-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <div className="rounded-2xl border border-black/5 bg-[#faf9f6] p-8 shadow-sm md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-[#111111]">
                Send us a Message
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-sm font-medium text-[#111111]"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-sm font-medium text-[#111111]"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-[#111111]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-[#111111]"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="connect">Next Steps / Connecting</option>
                    <option value="care">Pastoral Care</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-[#111111]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-[140px] w-full resize-y rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-yellow-500 text-sm font-semibold text-black transition-colors duration-300 hover:scale-[1.02] hover:bg-yellow-400"
                >
                  <HiOutlinePaperAirplane className="h-4 w-4 rotate-90" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
