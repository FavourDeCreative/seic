"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaCoins } from "react-icons/fa";

// Anchor links to sections on the single page (add matching `id` props
// to each section, e.g. <section id="about"> ... </section>).
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Ministries", href: "#ministries" },
  { name: "Sermons", href: "#sermons" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const coinRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav-brand", {
        y: -24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "opacity,transform",
      });

      gsap.from(".nav-link", {
        y: -16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
        overwrite: "auto",
        clearProps: "opacity,transform",
      });

      gsap.from(".nav-action", {
        x: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.25,
        overwrite: "auto",
        clearProps: "opacity,transform",
      });

      gsap.from(".nav-toggler", {
        x: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.25,
        overwrite: "auto",
        clearProps: "opacity,transform",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Continuous coin flip on the Give button — independent, infinite loop,
  // so it never conflicts with the one-off entrance tweens above.
  useEffect(() => {
    if (!coinRef.current) return;

    const tween = gsap.to(coinRef.current, {
      rotateY: 360,
      duration: 1.6,
      ease: "linear",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.fromTo(
          ".mobile-menu-item",
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }
    }, menuRef);

    return () => ctx.revert();
  }, [menuOpen]);

  // Lock body scroll while the mobile menu is open, and allow Escape to close it.
  useEffect(() => {
    if (menuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [menuOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-3 lg:justify-normal">
          {/* ================= Logo (left) ================= */}
          <div className="nav-brand flex justify-start">
            <a href="#home" className="flex items-center gap-3">
              <Image
                src="/img/logo1.png"
                alt="Church Logo"
                width={58}
                height={58}
                priority
              />

              <div className="hidden xl:block">
                <h2
                  className={`text-lg font-bold transition-colors ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  Salvation Empire
                </h2>
                <p
                  className={`text-xs transition-colors ${
                    scrolled ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  City of Peace
                </p>
              </div>
            </a>
          </div>

          {/* ================= Nav links (center) ================= */}
          <nav className="hidden lg:flex justify-center">
            <ul className="flex items-center gap-10">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`nav-link relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-yellow-500 ${
                      scrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ================= Give button (right) ================= */}
          <div className="flex items-center justify-end gap-4">
            <a
              href="#give"
              className="nav-action hidden items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-yellow-400 lg:inline-flex"
            >
              <span
                ref={coinRef}
                className="inline-block [perspective:400px] [transform-style:preserve-3d]"
              >
                <FaCoins className="h-4 w-4" />
              </span>
              Give
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`nav-toggler text-3xl lg:hidden ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </div>
      </header>

      {/* ================= Overlay ================= */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* ================= Mobile Sidebar ================= */}
      <aside
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-500 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-24 items-center justify-between border-b px-6">
          <Image
            src="/img/logo1.png"
            alt="Church Logo"
            width={55}
            height={55}
          />

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-3xl text-gray-800"
          >
            <HiOutlineX />
          </button>
        </div>

        <nav className="mt-10 px-8">
          <ul className="space-y-8">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-menu-item block text-lg font-medium text-gray-700 transition-colors hover:text-yellow-500"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#give"
            onClick={() => setMenuOpen(false)}
            className="mobile-menu-item mt-12 flex w-full items-center justify-center gap-2 rounded-full bg-yellow-500 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            <FaCoins className="h-4 w-4" />
            Give
          </a>
        </nav>
      </aside>
    </>
  );
}
