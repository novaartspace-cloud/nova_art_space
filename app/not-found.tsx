import Link from "next/link";
import Navigation from "./components/Navigation";

// Force dynamic rendering to avoid static generation issues with useSearchParams
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-[#495464] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#495464] mb-8">
          Страницата не е намерена
        </h2>
        <p className="text-gray-600 mb-8">
          Съжаляваме, но страницата, която търсите, не съществува.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#495464] text-white px-6 py-3 rounded-lg hover:bg-[#3a4452] transition-colors duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Върни се към началната страница
        </Link>
      </div>
    </div>
  );
}

