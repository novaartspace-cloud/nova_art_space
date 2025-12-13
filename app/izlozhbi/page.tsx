import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Izlozhbi() {
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

        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          Изложби
        </h1>

        {/* Настояща изложба */}
        <div className="mb-16 pb-16 border-b border-[#E8E8E8]">
          <div className="mb-4">
            <span className="inline-block bg-[#495464] text-white px-4 py-1 rounded-full text-sm font-medium">
              Настояща
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
            „Ренесанс"
          </h2>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
            Проектът "Ренесанс" представя синтез между живопис и керамика, дело на шестима утвърдени български творци - Валентин Ангелов, Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева и Михаил Лалов.
          </p>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
            Обединени около идеята за художествено възраждане на керамиката, авторите търсят границите на формата, цвета и живописното мислене, трансформирани в триизмерната пластика на глината. В изложбата виждаме как преплетеното между традицията и съвременността, между класическата живопис и модерната пластика, се превръща в смисъл и визуално изживяване.
          </p>
          <p className="text-lg text-[#495464]/80 leading-relaxed mb-2">
            Изложбата ще се проведе от 24 до 30 ноември в галерия nOva art space, ул. Съборна №3 (ниво -1). Откриването е на 24 ноември от 18:00ч.
          </p>
          <p className="text-base text-[#495464]/70 italic">
            Проектът се осъществява със средствата на Recovery and Resilience Plan и подкрепата на Национале фонд "Култура".
          </p>
        </div>

        {/* Минали изложби */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Минали изложби
          </h2>

          <div className="space-y-12">
            {/* COLLECTIVE PULSE */}
            <div className="pb-8 border-b border-[#E8E8E8]">
              <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                COLLECTIVE PULSE
              </h3>
              <p className="text-[#495464]/70 mb-4">
                <strong>Автори:</strong> Илия Желев, Евгени Йонов, Борислав Георгиев, Илиана Илиева
              </p>
              <p className="text-[#495464]/70 mb-4">
                <strong>Дата:</strong> 9-30 октомври 2025
              </p>
              <p className="text-[#495464]/70 mb-2">
                <strong>Куратор:</strong> Каролина Панаинте
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Поп арт манифест на колективната енергия. Без рамки. Без тишина. Само ритъм и цвят. Благодарим на всички, които усетиха пулса на изкуството.
              </p>
            </div>

            {/* Моят Дон Кихот */}
            <div className="pb-8 border-b border-[#E8E8E8]">
              <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                Моят Дон Кихот
              </h3>
              <p className="text-[#495464]/70 mb-4">
                <strong>Автор:</strong> Васил Василев – Зуек
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Изкуството събра своята публика. Откриването на изложбата на Васил Василев-Зуека в nOva art space се превърна в изискано културно събитие, което обедини артистичния свят, ценителите и представители на светския и бизнес елит в София.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed mt-4">
                Благодарим на всички, които споделиха този специален момент с нас. @nova_art_space е пространство, в което съвременното изкуство среща стойностна публика и нови хоризонти.
              </p>
            </div>

            {/* НЕграфика */}
            <div className="pb-8 border-b border-[#E8E8E8]">
              <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                „НЕграфика"
              </h3>
              <p className="text-[#495464]/70 mb-4">
                <strong>Автор:</strong> Людмил Георгиев
              </p>
              <p className="text-[#495464]/70 mb-4">
                <strong>Дата:</strong> 26 март – 12 април 2025
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                nOva art space представя „НЕграфика" - новата самостоятелна изложбa на Людмил Георгиев. Може ли графиката да се превърне в живопис? Отговорът можете да откриете в новите творби на графика Людмил Георгиев.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                „НЕграфика" е изложба, която разчупва установените порядки в графиката – графични платна с размери от порядъка на 150х110 см. или 120х80 см., с наситени и ярки цветове, които дават експресивност и редят строфи в творбата, които се римуват в линии и елементи, прерастващи в емоции.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                В тази изложба ще видим един различен Людмил Георгиев, които чрез приобщаване на елементи от бита като автомобилно стъкло и корк, той достига нови висоти в графиката. Той си играе и с цветовете, и ги превръща в една инфузия, която напомня на живопис. Куратори на изложбата са Каролина Панаинте и Доротея Павлова.
              </p>
            </div>

            {/* Колекцията */}
            <div className="pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                „Колекцията"
              </h3>
              <p className="text-[#495464]/70 mb-4">
                <strong>Дата:</strong> 27.02.2025
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Представяме Ви част от специалната колекция от произведения на едни от най-видните ни класици, подбрана за нашата публика.
              </p>
            </div>
          </div>
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






