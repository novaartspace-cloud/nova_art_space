import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Subitiya() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-[#495464] hover:text-[#495464]/80 font-medium"
        >
          ← Назад към началната страница
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-6">
          nOva art space – сцена за Вашите идеи
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#495464]/90 mb-12 font-medium">
          Пространство, създадено да издига всяка идея — с възможностите на галерия и въздействието на премиум локация.
        </h2>

        {/* Какво предлагаме */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12">
            Какво предлагаме
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                400 кв.м адаптивно пространство
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Гъвкава архитектура, която позволява изграждане на различни формати — от корпоративни срещи и коктейли до модни и PR събития. Пространството се персонализира спрямо концепцията на вашия бранд.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Високи тавани за премиум присъствие
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Впечатляващ вертикален обем, който създава усещане за свобода, стил и престиж — идеална среда за събития, които искат да оставят следа.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Професионален подиум / сцена
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Изцяло оборудвана зона за презентации, модни ревюта, дискусии и специални акценти. Сцената е проектирана да поставя фокуса там, където трябва да бъде — върху вашето послание.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Ескалаторен достъп
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Уникален елемент, който предлага запомнящо се влизане и максимално удобство. Детайл, който подсилва усещането за премиум пространство още от първата секунда.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Професионално озвучаване
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Висококачествена аудио система с професионални микрофони, тонколони и аудио пулт, гарантиращи кристален и равномерен звук за всякакъв тип формати — реч, музика, лайв изпълнения.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Мултимедийна техника и брандинг решения
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Екрани 75" и 55", възможности за визуална идентичност и дигитални акценти. Подходящо за презентации, премиери, продуктови активации и корпоративни събития.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Галерийно осветление
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Професионално светлинно оформление, което подчертава детайла и създава отлична атмосфера за фото, видео и premium имидж комуникация.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#495464] mb-4">
                Депо / Backstage зона
              </h3>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Функционално оборудвана бекстейдж площ за подготовка на участници, екип и логистика — идеална за модни ревюта, артистични формати и корпоративни събития със сложна организация.
              </p>
            </div>
          </div>
        </div>

        {/* Подходящо за */}
        <div className="mb-16 bg-[#E8E8E8] p-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Подходящо за:
          </h2>
          <ul className="space-y-3 text-lg text-[#495464]/80">
            <li>• Изложби</li>
            <li>• Корпоративни срещи и презентации</li>
            <li>• PR и медийни събития</li>
            <li>• Модни формати и продуктови премиери</li>
            <li>• Частни коктейли и специални поводи</li>
            <li>• Ексклузивни бизнес срещи и networking събития</li>
          </ul>
        </div>

        {/* Общо послание */}
        <div className="mb-12">
          <p className="text-xl text-[#495464] leading-relaxed italic">
            В nOva art space пространството не е просто фон — то е активен елемент, който оформя впечатление, стил и стойност. Вашето събитие става изживяване, което гостите помнят.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="mailto:novaartspace@gmail.com?subject=Запитване за събитие"
            className="inline-block bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-colors"
          >
            Изпрати запитване
          </a>
        </div>
      </div>

      <footer className="bg-[#495464] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#BBBFCA]">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}






