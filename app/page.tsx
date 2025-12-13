import Navigation from "./components/Navigation";
import MainSlider from "./components/MainSlider";
import Link from "next/link";
import Image from "next/image";
import {
  IconPalette,
  IconTheater,
  IconLightBulb,
  IconBuilding,
  IconUsers,
  IconLocation,
  IconPhone,
  IconMail,
  IconGlobe,
  IconCalendar,
  IconParty,
  IconNewspaper,
  IconOffice,
} from "./components/Icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <MainSlider />

      {/* Настояща изложба */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                Настояща изложба
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
              „Ренесанс"
            </h2>
            <div className="space-y-4 mb-6">
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Проектът "Ренесанс" представя синтез между живопис и керамика,
                дело на шестима утвърдени български творци - Валентин Ангелов,
                Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева и
                Михаил Лалов.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Обединени около идеята за художествено възраждане на керамиката,
                авторите търсят границите на формата, цвета и живописното
                мислене, трансформирани в триизмерната пластика на глината. В
                изложбата виждаме как преплетеното между традицията и
                съвременността, между класическата живопис и модерната пластика,
                се превръща в смисъл и визуално изживяване.
              </p>
            </div>
            <div className="bg-[#E8E8E8]/50 rounded-lg p-6 mb-8 border-l-4 border-[#495464]">
              <p className="text-lg text-[#495464]/90 leading-relaxed mb-2 font-medium flex items-center gap-2">
                <IconCalendar className="w-5 h-5 text-[#495464]" />
                Изложбата ще се проведе от 24 до 30 ноември
              </p>
              <p className="text-base text-[#495464]/70 flex items-center gap-2">
                <IconLocation className="w-5 h-5 text-[#495464]" />
                Галерия nOva art space, ул. Съборна №3 (ниво -1)
              </p>
              <p className="text-base text-[#495464]/70 mt-2 flex items-center gap-2">
                <IconParty className="w-5 h-5 text-[#495464]" />
                Откриването е на 24 ноември от 18:00ч.
              </p>
            </div>
            <p className="text-base text-[#495464]/70 mb-8 italic border-l-2 border-[#BBBFCA] pl-4">
              Проектът се осъществява със средствата на Recovery and Resilience
              Plan и подкрепата на Национале фонд "Култура".
            </p>
            <Link
              href="/izlozhbi"
              className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              Разгледай изложбата
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Организирай събитие */}
      <section className="py-20 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                Събития
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
              nOva art space – сцена за Вашите идеи
            </h2>
            <h3 className="text-xl md:text-2xl text-[#495464]/90 mb-8 font-medium leading-relaxed">
              Пространство, създадено да издига всяка идея — с възможностите на
              галерия и въздействието на премиум локация.
            </h3>
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src="/zala1.jpg"
                alt="nOva art space зала"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>
            <Link
              href="/subitiya"
              className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              Изпрати запитване
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* За nOva art space */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -ml-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-0.5 bg-[#495464]"></span>
                <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                  За нас
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
                Галерия с история на две поколения и поглед към бъдещето
              </h2>
              <div className="space-y-6 mb-8">
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  nOva art space е съвременна галерия и премиум пространство за
                  събития, което съчетава изкуство, архитектура и бизнес визия.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  Нашият фокус е върху стойностни произведения — от големите
                  български майстори до силни съвременни автори — представени в
                  среда, създадена за фокус, усещане и престиж.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-[#495464]/70">
                  <IconBuilding className="w-5 h-5 text-[#495464]" />
                  <span className="text-sm">Пет пространства</span>
                </div>
                <div className="flex items-center gap-2 text-[#495464]/70">
                  <IconUsers className="w-5 h-5 text-[#495464]" />
                  <span className="text-sm">Две поколения</span>
                </div>
                <div className="flex items-center gap-2 text-[#495464]/70">
                  <IconPalette className="w-5 h-5 text-[#495464]" />
                  <span className="text-sm">Една мисия</span>
                </div>
              </div>
              <Link
                href="/za-nas"
                className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                Научи повече
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Right side - Image */}
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/vhod.webp"
                alt="nOva art space вход"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Новини и акценти */}
      <section className="py-20 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                Новини
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
              Новини и акценти
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Следете последните изложби, събития и инициативи на nOva art
                space.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Тук споделяме моменти, които оформят нашата културна и
                професионална динамика.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8 border border-[#E8E8E8]">
              <div className="flex items-start gap-4">
                <IconNewspaper className="w-8 h-8 text-[#495464] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#495464] mb-2">
                    Последна новина
                  </h3>
                  <p className="text-sm text-[#495464]/70 mb-2">
                    Конкурс за млади автори „SCULPTING THE FUTURE"
                  </p>
                  <p className="text-xs text-[#495464]/60">
                    nOva art space даде сцена на новото поколение таланти.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/novini"
              className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              Виж всички новини
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Контакти */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -mr-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                Контакти
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
              Свържете се с нас
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconLocation className="w-6 h-6 text-[#495464]" />
                  <h3 className="font-semibold text-[#495464]">Адрес</h3>
                </div>
                <a
                  href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                >
                  гр. София, ул. Съборна № 3, ниво -1
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconPhone className="w-6 h-6 text-[#495464]" />
                  <h3 className="font-semibold text-[#495464]">Телефон</h3>
                </div>
                <a
                  href="tel:0888426610"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                >
                  0888 426 610
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconMail className="w-6 h-6 text-[#495464]" />
                  <h3 className="font-semibold text-[#495464]">Имейл</h3>
                </div>
                <a
                  href="mailto:novaartspace@gmail.com"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                >
                  novaartspace@gmail.com
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconGlobe className="w-6 h-6 text-[#495464]" />
                  <h3 className="font-semibold text-[#495464]">
                    Социални мрежи
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/nova_art_space/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/artspacenOva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">
                nOva art space
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Съвременна галерия и премиум пространство за събития в сърцето
                на София.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">
                Бързи връзки
              </h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link
                    href="/izlozhbi"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Изложби
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subitiya"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Събития
                  </Link>
                </li>
                <li>
                  <Link
                    href="/novini"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Новини
                  </Link>
                </li>
                <li>
                  <Link
                    href="/za-nas"
                    className="hover:text-white transition-colors duration-300"
                  >
                    За нас
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Свържете се</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a
                    href="tel:0888426610"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <IconPhone className="w-4 h-4 text-white/80" /> 0888 426 610
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:novaartspace@gmail.com"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <IconMail className="w-4 h-4 text-white/80" />{" "}
                    novaartspace@gmail.com
                  </a>
                </li>
                <li className="flex gap-4 pt-2">
                  <a
                    href="https://www.instagram.com/nova_art_space/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/artspacenOva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} nOva art space. Всички права
              запазени.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
