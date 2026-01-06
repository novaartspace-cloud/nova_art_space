"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";
import { useState } from "react";
import {
  IconLocation,
  IconPhone,
  IconMail,
  IconGlobe,
  IconCamera,
  IconFacebook,
} from "../components/Icons";

export default function Kontakti() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Грешка при изпращане");
      }

      setSubmitStatus({
        type: "success",
        message: "Съобщението е изпратено успешно! Ще се свържем с вас скоро.",
      });
      setFormData({ email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Грешка при изпращане на съобщението. Моля опитайте отново.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
          className="back-button-animate inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group mb-8"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад към началната страница
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span
            className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Контакти
          </span>
        </div>

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconLocation className="w-8 h-8 text-[#495464]" />
                <h2
                  className="text-2xl font-bold text-[#495464]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Адрес
                </h2>
              </div>
              <a
                href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                гр. София, ул. Съборна № 3, ниво -1
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconPhone className="w-8 h-8 text-[#495464]" />
                <h2
                  className="text-2xl font-bold text-[#495464]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Телефон
                </h2>
              </div>
              <a
                href="tel:0888426610"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block text-lg"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                0888 426 610
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconMail className="w-8 h-8 text-[#495464]" />
                <h2
                  className="text-2xl font-bold text-[#495464]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  E-mail
                </h2>
              </div>
              <a
                href="mailto:novaartspace@gmail.com"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block break-all"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                novaartspace@gmail.com
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconGlobe className="w-8 h-8 text-[#495464]" />
                <h2
                  className="text-2xl font-bold text-[#495464]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Социални мрежи
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/nova_art_space/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 inline-flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  <IconCamera className="w-4 h-4 text-[#495464]" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/artspacenOva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 inline-flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  <IconFacebook className="w-4 h-4 text-[#495464]" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-16">
            <h2
              className="text-2xl font-bold text-[#495464] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Карта
            </h2>
            <div className="rounded-lg overflow-hidden shadow-md border border-[#E8E8E8]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d23.3219!3d42.6975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDQxJzUxLjAiTiAyM8KwMTknMTkuNCJF!5e0!3m2!1sen!2sbg!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="zapitvane"
            className="mt-16 pt-16 border-t-2 border-[#E8E8E8]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span
                className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Запитване
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#495464] mb-8"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Изпрати запитване
            </h2>
            <p
              className="text-lg text-[#495464]/70 mb-8"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Попълнете формата по-долу и ще се свържем с вас възможно
              най-скоро.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#495464] mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Имейл <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] text-[#495464]"
                  placeholder="ваш@имейл.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#495464] mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] text-[#495464]"
                  placeholder="0888 123 456"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#495464] mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Съобщение <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] text-[#495464] resize-none"
                  placeholder="Напишете вашето съобщение тук..."
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#495464] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#3a4149] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {isSubmitting ? "Изпращане..." : "Изпрати запитване"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-white/80 text-sm"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
