import Navigation from "../components/Navigation";
import Link from "next/link";
import Image from "next/image";
import {
  IconPalette,
  IconEye,
  IconBriefcase,
  IconImage,
  IconBook,
  IconParty,
  IconUsers,
  IconRefresh,
} from "../components/Icons";

export default function ZaNas() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
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
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            За нас
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          За нас
        </h1>

        {/* Основен текст */}
        <div className="mb-20 bg-gradient-to-br from-[#E8E8E8]/30 to-transparent rounded-lg p-8 md:p-12 border border-[#E8E8E8]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
                nOva art space: Галерия, която изгражда нов контекст за
                изкуството.
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  nOva art space е съвременно културно пространство, изградено
                  върху повече от две десетилетия традиция, професионализъм и
                  отдаденост към изкуството. Разположена на престижния адрес ул.
                  „Съборна" № 3, в самото сърце на София, галерията е сцена, на
                  която класическото и съвременното изкуство живеят в нов,
                  разширен контекст.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  След трансформацията си през 2025 г. пространството предлага
                  над 400 кв.м модерна изложбена площ и над 100 метра
                  експозиционни възможности, допълнени от професионално
                  осветление, озвучаване, мултимедия и подиум сцена – създавайки
                  условия за изложби, премиери, концерти, литературни формати и
                  корпоративни събития на премиум ниво.
                </p>
              </div>
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

        {/* Нашата история */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              История
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
            Нашата история
          </h2>
          <div className="bg-[#E8E8E8]/30 rounded-lg p-6 mb-8 border-l-4 border-[#495464]">
            <p className="text-2xl text-[#495464] font-semibold">
              Пет пространства. Две поколения. Една непрекъсната линия на
              развитие.
            </p>
          </div>
          <div className="space-y-6 text-lg text-[#495464]/80 leading-relaxed">
            <p>
              Историята на nOva art space започва през 1997 г., когато Ваня
              Атанасова открива първото пространство – галерия „Жорж Папазов" в
              Пловдив. Галерията бързо се превръща в емблематично място в
              културния пейзаж на града и поставя основите на дългогодишна
              традиция, посветена на изкуството.
            </p>
            <p>
              През 2009 г. второто поколение продължава тази мисия. Спартак
              Атанасов създава Арт център „Форум" на ул. „Георг Вашингтон" 24,
              София – впечатляващо арт пространство в стил сецесион, включващо
              осем зали, предназначени за мащабни изложби и културни събития.
              Това е първият голям мост между артистичната среда на Пловдив и
              столицата.
            </p>
            <p>
              Развитието продължава през 2014 г. с трето пространство – галерия
              „Форум" на бул. „Васил Левски" 93, София, място, което бързо се
              превръща в важен ориентир за колекционери, ценители и съвременни
              автори.
            </p>
            <p>
              През 2019 г. се появява четвъртото пространство – nOva art space,
              тогава вече с нова концепция: хипермодерна сцена за изложби,
              концерти, театрални форми, премиери и разнообразни културни
              формати, отговарящи на динамиката на съвременната публика.
            </p>
            <p>
              През 2025 г. галерията достига своя най-мащабен етап –
              преместването и разширяването на ул. „Съборна" № 3, превръщайки се
              в петото пространство от този дълъг и последователен път. Това е
              най-голямото и технологично напреднало средище досега – създадено
              да разказва истории чрез изкуство и да бъде дом на вдъхновяващи
              културни преживявания.
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#E8E8E8] mt-6">
              <p className="font-semibold text-[#495464] text-lg">
                Две поколения, пет пространства и една непроменена мисия:
                уважение към изкуството, професионално кураторство и желание да
                се развива българската арт сцена.
              </p>
            </div>
          </div>
        </div>

        {/* Нашата мисия */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Мисия
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
            Нашата мисия
          </h2>
          <div className="bg-[#E8E8E8]/30 rounded-lg p-6 mb-6 border-l-4 border-[#495464]">
            <p className="text-2xl text-[#495464] font-semibold">
              Да поддържаме жив диалога между традиция и съвременност.
            </p>
          </div>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-6">
            Мисията на nOva art space е да създава среда, в която изкуството има
            силата да обединява хора, идеи и поколения. Стремим се да бъдем
            пространство, в което:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconPalette className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                утвърдени творци съжителстват с млади таланти;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconRefresh className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                класическото наследство намира своята естествена връзка със
                съвременните форми;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconEye className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                публиката не просто гледа, а преживява изкуството;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconBriefcase className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                културата и бизнесът се срещат и създават стойност един за друг.
              </p>
            </div>
          </div>
          <p className="text-lg text-[#495464]/80 leading-relaxed">
            В основата на нашата философия стои приемствеността – мостът между
            традиция и новаторство. Затова галерията активно подкрепя нови
            автори, организира професионални формати и предоставя сцена за
            реализация, развитие и диалог.
          </p>
        </div>

        {/* Какво представлява nOva art space днес */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Днес
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
            Какво представлява nOva art space днес
          </h2>
          <div className="bg-[#E8E8E8]/30 rounded-lg p-6 mb-6 border-l-4 border-[#495464]">
            <p className="text-2xl text-[#495464] font-semibold">
              Повече от галерия. Културно средище. Премиум пространство за
              събития и изкуство.
            </p>
          </div>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-6">
            Днес nOva art space е динамична и гъвкава сцена, в която се
            провеждат:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconImage className="w-8 h-8 mb-2 text-[#495464]" />
              <p className="text-[#495464]/80">
                изложби на български класици и съвременни автори;
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconBook className="w-8 h-8 mb-2 text-[#495464]" />
              <p className="text-[#495464]/80">
                литературни събития, камерни постановки и концерти;
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconParty className="w-8 h-8 mb-2 text-[#495464]" />
              <p className="text-[#495464]/80">
                корпоративни, модни, светски и частни събития, които използват
                силата на изкуството като премиум контекст.
              </p>
            </div>
          </div>
          <p className="text-lg text-[#495464]/80 leading-relaxed">
            Пространството предлага условия за различни типове инсталации,
            презентации и културни формати – подкрепено от професионално
            оборудване и архитектурни решения, които позволяват максимална
            свобода и креативност.
          </p>
        </div>

        {/* Нашата аудитория */}
        <div className="bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] p-8 md:p-12 rounded-lg border border-[#E8E8E8] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Аудитория
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
            Нашата аудитория
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-6 border-l-4 border-[#495464]">
            <p className="text-2xl text-[#495464] font-semibold">
              Творци. Колекционери. Публика. Бизнес.
            </p>
          </div>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-6">
            Галерията е създадена за всички, които вярват в силата на
            изкуството:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconPalette className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                автори, търсещи професионална платформа за своите идеи;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconImage className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                колекционери, които разчитат на професионална експертиза и
                селекция;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconUsers className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                публика, която търси вдъхновение, диалог и нови открития;
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#E8E8E8]">
              <IconBriefcase className="w-5 h-5 mt-1 text-[#495464]" />
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                бизнес клиенти, за които културната среда е знак за престиж и
                идентичност.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
