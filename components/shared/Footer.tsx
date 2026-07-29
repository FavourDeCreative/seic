"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTikTok,
  AiOutlineYoutube,
} from "react-icons/ai";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Ministries", href: "#ministries" },
  { name: "Sermons", href: "#sermons" },
  { name: "Give", href: "#give" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1HUX6s8dZb/",
    icon: AiOutlineFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: AiOutlineInstagram,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@salvationempirechurch?_r=1&_t=ZS-98QdEhzsEs8", icon: AiOutlineTikTok },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SalvationEmpireChurchIntl",
    icon: AiOutlineYoutube,
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: "auto",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-[#111111] pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* ================= Brand ================= */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo1.png"
                alt="Church Logo"
                width={50}
                height={50}
              />
              <div>
                <h3 className="text-base font-bold text-white">
                  Salvation Empire
                </h3>
                <p className="text-xs text-gray-400">City of Peace</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              A place to find grace and build community. Sharing love, hope, and
              faith with everyone who walks through our doors.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-colors hover:border-yellow-500 hover:text-yellow-500"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ================= Quick Links ================= */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-yellow-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Service Times ================= */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Service Times
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <span className="block font-medium text-white">
                  Sunday Worship
                </span>
                9:00 AM &amp; 11:00 AM
              </li>
              <li>
                <span className="block font-medium text-white">
                  Midweek Bible Study
                </span>
                Wednesdays, 7:00 PM
              </li>
              <li>
                <span className="block font-medium text-white">
                  Youth Service
                </span>
                Fridays, 6:30 PM
              </li>
            </ul>
          </div>

          {/* ================= Contact ================= */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span>12 Salvation Way, Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlinePhone className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineMail className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span>hello@salvationempire.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom Bar ================= */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500">
            © {year} Salvation Empire Church International. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-gray-500 transition-colors hover:text-yellow-500"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-500 transition-colors hover:text-yellow-500"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
