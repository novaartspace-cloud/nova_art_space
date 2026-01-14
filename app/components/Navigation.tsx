"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuItems = [
    { label: "Изложби", href: "/izlozhbi" },
    { label: "Събития", href: "/subitiya" },
    { label: "Новини", href: "/novini" },
    { label: "За нас", href: "/za-nas" },
    { label: "Контакти", href: "/kontakti" },
  ];

  // Set mounted to true after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.jpg"
                alt="nOva art space"
                width={150}
                height={60}
                className="h-auto transition-transform duration-300 group-hover:scale-105"
                style={{ height: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[#495464] hover:text-[#495464] font-medium transition-all duration-300 px-4 py-2 rounded-lg group"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-[#E8E8E8] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#495464] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#495464] p-2 rounded-lg hover:bg-[#E8E8E8] transition-colors duration-300 z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay - only render on client after mount */}
      {mounted && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu - slides from right to left */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#E8E8E8]">
                <h2 className="text-xl font-semibold text-[#495464]" style={{ fontFamily: "var(--font-playfair), serif" }}>Меню</h2>
                <button
                  className="text-[#495464] p-2 rounded-lg hover:bg-[#E8E8E8] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-2 px-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-[#495464] hover:text-[#495464] font-medium transition-all duration-300 px-4 py-3 rounded-lg hover:bg-[#E8E8E8]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
