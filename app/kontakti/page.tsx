import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Kontakti() {
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
          Контакти
        </h1>

        <div className="max-w-4xl">
          <div className="space-y-8 text-lg text-[#495464]/80">
            <div>
              <h2 className="text-2xl font-bold text-[#495464] mb-4">Адрес</h2>
              <p className="mb-2">
                <a
                  href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#495464] underline"
                >
                  гр. София, ул. Съборна № 3, ниво -1
                </a>
              </p>
              <div className="mt-4">
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

            <div>
              <h2 className="text-2xl font-bold text-[#495464] mb-4">Телефон</h2>
              <p>
                <a
                  href="tel:0888426610"
                  className="hover:text-[#495464] underline"
                >
                  0888 426 610
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#495464] mb-4">Имейл</h2>
              <p>
                <a
                  href="mailto:novaartspace@gmail.com"
                  className="hover:text-[#495464] underline"
                >
                  novaartspace@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#495464] mb-4">Социални мрежи</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.instagram.com/nova_art_space/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464] hover:text-[#495464]/80 underline"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/artspacenOva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464] hover:text-[#495464]/80 underline"
                >
                  Facebook
                </a>
              </div>
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






