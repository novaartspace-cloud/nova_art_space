import Navigation from "../components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Политика за Поверителност - nOva art space",
  description: "Политика за поверителност и защита на личните данни на nOva art space",
};

export default function PolitikaZaPoveritelnost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
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
            Политика за Поверителност
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#495464] mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Политика за Поверителност
          </h1>

          <p
            className="text-base text-[#495464]/80 mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <strong>Последна актуализация:</strong> {new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                1. Въведение
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                nOva art space ("ние", "нас", "наш") се ангажираме да защитаваме вашата поверителност. 
                Тази Политика за Поверителност обяснява как събираме, използваме, разкриваме и защитаваме 
                вашата лична информация, когато посещавате нашия уебсайт или използвате нашите услуги.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                2. Лични данни, които събираме
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Когато използвате нашия уебсайт или се свържете с нас, можем да събираме следната информация:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Контактна информация:</strong> Имейл адрес, телефонен номер, име</li>
                <li><strong>Информация за комуникация:</strong> Съобщения, които изпращате чрез нашата контактна форма</li>
                <li><strong>Техническа информация:</strong> IP адрес, тип браузър, операционна система, страници, които посещавате</li>
                <li><strong>Бисквитки:</strong> Използваме бисквитки за подобряване на функционалността на уебсайта</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                3. Как използваме вашите данни
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Използваме събраната информация за следните цели:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li>Отговор на вашите запитвания и комуникация с вас</li>
                <li>Подобряване на функционалността и потребителското изживяване на уебсайта</li>
                <li>Анализ на използването на уебсайта за статистически цели</li>
                <li>Спазване на правни задължения</li>
                <li>Защита на правата и сигурността на нашите потребители</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                4. Споделяне на данни
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Не продаваме, не търгуваме и не предаваме вашите лични данни на трети страни, освен в следните случаи:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li>Когато е необходимо за предоставяне на услуги (например, доставчици на имейл услуги)</li>
                <li>Когато е изисквано от закон или по заповед на съда</li>
                <li>За защита на правата, собствеността или сигурността на nOva art space</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                5. Защита на данните
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни срещу 
                неоторизиран достъп, загуба, унищожаване или промяна. Въпреки това, никой метод за предаване 
                в интернет или електронно съхранение не е 100% сигурен.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                6. Вашите права
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                В съответствие с GDPR и българското законодателство, имате правото да:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li>Достъп до вашите лични данни</li>
                <li>Корекция на неточни или непълни данни</li>
                <li>Изтриване на вашите данни ("право на забвение")</li>
                <li>Ограничаване на обработката на данните</li>
                <li>Преносимост на данните</li>
                <li>Възражение срещу обработката</li>
                <li>Оттегляне на съгласието по всяко време</li>
              </ul>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                За упражняване на тези права, моля свържете се с нас на:{" "}
                <a
                  href="mailto:novaartspace@gmail.com"
                  className="text-[#495464] hover:underline font-semibold"
                >
                  novaartspace@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                7. Бисквитки (Cookies)
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Нашият уебсайт използва бисквитки за подобряване на функционалността. Можете да настроите 
                вашия браузър да отказва бисквитки, но това може да повлияе на функционалността на уебсайта.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                8. Промени в политиката
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Запазваме си правото да актуализираме тази Политика за Поверителност по всяко време. 
                Всички промени ще бъдат публикувани на тази страница с актуализирана дата. Препоръчваме 
                ви да преглеждате тази страница периодично.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                9. Контакт
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ако имате въпроси относно тази Политика за Поверителност или искате да упражните вашите права, 
                моля свържете се с нас:
              </p>
              <div
                className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <p className="text-lg text-[#495464] mb-2">
                  <strong>nOva art space</strong>
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  гр. София, ул. Съборна № 3, ниво -1
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  Email:{" "}
                  <a
                    href="mailto:novaartspace@gmail.com"
                    className="text-[#495464] hover:underline"
                  >
                    novaartspace@gmail.com
                  </a>
                </p>
                <p className="text-base text-[#495464]/80">
                  Телефон:{" "}
                  <a
                    href="tel:0888426610"
                    className="text-[#495464] hover:underline"
                  >
                    0888 426 610
                  </a>
                </p>
              </div>
            </section>
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
