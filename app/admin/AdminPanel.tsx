"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NewsAdminPanel from "./NewsAdminPanel";
import CarouselAdminPanel from "./CarouselAdminPanel";
import CarouselMobileAdminPanel from "./CarouselMobileAdminPanel";
import EventImagesAdminPanel from "./EventImagesAdminPanel";

interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  main_image: string;
  author: string;
  date: string;
  position: number;
  slug: string;
}

interface ExhibitionWithImages extends Exhibition {
  images: string[];
}

type TabType = "exhibitions" | "news" | "carousel" | "carousel-mobile" | "events";

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("exhibitions");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exhibitions, setExhibitions] = useState<ExhibitionWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExhibition, setEditingExhibition] =
    useState<ExhibitionWithImages | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    text: "",
    main_image: "",
    author: "",
    date: "",
    position: 0,
    slug: "",
    images: [] as string[],
  });
  const [uploading, setUploading] = useState<string | null>(null); // Track which field is uploading
  const [showPositionHelp, setShowPositionHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await fetch("/api/exhibitions");
      const data = await response.json();

      // Fetch images for each exhibition
      const exhibitionsWithImages = await Promise.all(
        data.map(async (ex: Exhibition) => {
          const imagesResponse = await fetch(
            `/api/exhibitions/${ex.id}/images`
          );
          const imagesData = await imagesResponse.json();
          return {
            ...ex,
            images: imagesData || [],
          };
        })
      );

      setExhibitions(exhibitionsWithImages);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { createBrowserClient } = await import("@supabase/ssr");
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
      );
      await supabase.auth.signOut();
      // Force full page reload
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error logging out:", error);
      window.location.href = "/admin/login";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const images = formData.images.filter((url) => url.trim() !== "");

    const payload = {
      ...formData,
      images,
    };

    try {
      // Check if position is already taken by another exhibition
      const targetPosition = formData.position;
      if (targetPosition !== 1000 && targetPosition !== undefined) {
        const existingExhibition = exhibitions.find(
          (ex) =>
            ex.position === targetPosition &&
            (!editingExhibition || ex.id !== editingExhibition.id)
        );

        // If position is taken, archive the old exhibition
        if (existingExhibition) {
          const archiveResponse = await fetch(
            `/api/exhibitions/${existingExhibition.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ position: 1000 }),
            }
          );

          if (!archiveResponse.ok) {
            const error = await archiveResponse.json();
            alert(
              error.error ||
                "Грешка при архивиране на старата изложба. Моля опитайте отново."
            );
            return;
          }
        }
      }

      if (editingExhibition) {
        // Update
        const response = await fetch(
          `/api/exhibitions/${editingExhibition.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Error updating exhibition");
          return;
        }
      } else {
        // Create
        const response = await fetch("/api/exhibitions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Error creating exhibition");
          return;
        }
      }

      // Reset form and refresh
      setFormData({
        title: "",
        subtitle: "",
        text: "",
        main_image: "",
        author: "",
        date: "",
        position: 0,
        slug: "",
        images: [],
      });
      setShowForm(false);
      setEditingExhibition(null);
      fetchExhibitions();
    } catch (error) {
      console.error("Error saving exhibition:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = (exhibition: ExhibitionWithImages) => {
    setEditingExhibition(exhibition);
    setFormData({
      title: exhibition.title,
      subtitle: exhibition.subtitle || "",
      text: exhibition.text || "",
      main_image: exhibition.main_image || "",
      author: exhibition.author || "",
      date: exhibition.date || "",
      position: exhibition.position,
      slug: exhibition.slug,
      images: [...exhibition.images],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази изложба?")) {
      return;
    }

    try {
      const response = await fetch(`/api/exhibitions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Error deleting exhibition");
        return;
      }

      fetchExhibitions();
    } catch (error) {
      console.error("Error deleting exhibition:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUpload = async (
    file: File,
    field: "main_image" | `image_${number}`
  ) => {
    const fieldKey = field === "main_image" ? "main_image" : field;
    setUploading(fieldKey);

    try {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Файлът е твърде голям. Максималният размер е 10MB.");
        setUploading(null);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Моля, качи само снимки.");
        setUploading(null);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Upload error response:", data);
        alert(data.error || "Грешка при качване на снимката");
        setUploading(null);
        return;
      }

      if (!data.url) {
        console.error("No URL in response:", data);
        alert("Грешка: URL не беше върнат от сървъра");
        setUploading(null);
        return;
      }

      // Update the appropriate field
      if (field === "main_image") {
        setFormData((prev) => ({ ...prev, main_image: data.url }));
      } else {
        // Extract index from field name (e.g., "image_1" -> 0, "image_2" -> 1)
        const match = field.match(/image_(\d+)/);
        if (!match) {
          console.error("Invalid field format:", field);
          alert("Грешка: Невалиден формат на полето");
          setUploading(null);
          return;
        }
        const imageIndex = parseInt(match[1]) - 1;

        // Use functional update to ensure we have the latest state
        setFormData((prev) => {
          // Ensure images array exists
          const currentImages = prev.images || [];

          if (imageIndex < 0 || imageIndex >= currentImages.length) {
            console.error(
              "Invalid image index:",
              imageIndex,
              "Array length:",
              currentImages.length
            );
            alert("Грешка: Невалиден индекс на снимката");
            return prev; // Return unchanged state
          }

          const newImages = [...currentImages];
          newImages[imageIndex] = data.url;
          return { ...prev, images: newImages };
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Грешка при качване на снимката: ${
          error instanceof Error ? error.message : "Неизвестна грешка"
        }`
      );
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#495464]">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#495464] text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Админ Панел</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-white text-[#495464] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              Към уебсайта
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-[#495464] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              Изход
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#E8E8E8] border-b border-[#495464]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-medium text-[#495464] bg-white rounded-t-lg"
            >
              <span>
                {activeTab === "exhibitions" && "Изложби"}
                {activeTab === "news" && "Новини"}
                {activeTab === "carousel" && "Карусела (Компютър)"}
                {activeTab === "carousel-mobile" && "Карусела (Телефон)"}
                {activeTab === "events" && "Събития"}
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="bg-white border-t border-[#E8E8E8] rounded-b-lg shadow-lg">
                <button
                  onClick={() => {
                    setActiveTab("exhibitions");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                    activeTab === "exhibitions"
                      ? "bg-[#495464] text-white"
                      : "text-[#495464] hover:bg-[#E8E8E8]"
                  }`}
                >
                  Изложби
                </button>
                <button
                  onClick={() => {
                    setActiveTab("news");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                    activeTab === "news"
                      ? "bg-[#495464] text-white"
                      : "text-[#495464] hover:bg-[#E8E8E8]"
                  }`}
                >
                  Новини
                </button>
                <button
                  onClick={() => {
                    setActiveTab("carousel");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                    activeTab === "carousel"
                      ? "bg-[#495464] text-white"
                      : "text-[#495464] hover:bg-[#E8E8E8]"
                  }`}
                >
                  Карусела (Компютър)
                </button>
                <button
                  onClick={() => {
                    setActiveTab("carousel-mobile");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                    activeTab === "carousel-mobile"
                      ? "bg-[#495464] text-white"
                      : "text-[#495464] hover:bg-[#E8E8E8]"
                  }`}
                >
                  Карусела (Телефон)
                </button>
                <button
                  onClick={() => {
                    setActiveTab("events");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-medium transition-colors rounded-b-lg ${
                    activeTab === "events"
                      ? "bg-[#495464] text-white"
                      : "text-[#495464] hover:bg-[#E8E8E8]"
                  }`}
                >
                  Събития
                </button>
              </div>
            )}
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => setActiveTab("exhibitions")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "exhibitions"
                  ? "bg-white text-[#495464] border-b-2 border-[#495464]"
                  : "text-[#495464]/70 hover:text-[#495464]"
              }`}
            >
              Изложби
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "news"
                  ? "bg-white text-[#495464] border-b-2 border-[#495464]"
                  : "text-[#495464]/70 hover:text-[#495464]"
              }`}
            >
              Новини
            </button>
            <button
              onClick={() => setActiveTab("carousel")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "carousel"
                  ? "bg-white text-[#495464] border-b-2 border-[#495464]"
                  : "text-[#495464]/70 hover:text-[#495464]"
              }`}
            >
              Карусела (Компютър)
            </button>
            <button
              onClick={() => setActiveTab("carousel-mobile")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "carousel-mobile"
                  ? "bg-white text-[#495464] border-b-2 border-[#495464]"
                  : "text-[#495464]/70 hover:text-[#495464]"
              }`}
            >
              Карусела (Телефон)
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "events"
                  ? "bg-white text-[#495464] border-b-2 border-[#495464]"
                  : "text-[#495464]/70 hover:text-[#495464]"
              }`}
            >
              Събития
            </button>
          </div>
        </div>
      </div>

      {activeTab === "news" ? (
        <NewsAdminPanel />
      ) : activeTab === "carousel" ? (
        <CarouselAdminPanel />
      ) : activeTab === "carousel-mobile" ? (
        <CarouselMobileAdminPanel />
      ) : activeTab === "events" ? (
        <EventImagesAdminPanel />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingExhibition(null);
                setFormData({
                  title: "",
                  subtitle: "",
                  text: "",
                  main_image: "",
                  author: "",
                  date: "",
                  position: 0,
                  slug: "",
                  images: [],
                });
              }}
              className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
            >
              {showForm ? "Откажи" : "+ Добави нова изложба"}
            </button>
          </div>

          {/* Modal overlay for editing */}
          {showForm && editingExhibition && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => {
                  setShowForm(false);
                  setEditingExhibition(null);
                }}
              />
              {/* Modal panel */}
              <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b border-[#E8E8E8]">
                  <h2 className="text-2xl font-bold text-[#495464]">
                    Редактирай изложба
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingExhibition(null);
                    }}
                    className="text-[#495464] hover:text-[#3a4149] transition-colors p-2 hover:bg-[#E8E8E8] rounded-lg"
                    aria-label="Затвори"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Заглавие *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Подзаглавие
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Текст
                      </label>
                      <textarea
                        value={formData.text}
                        onChange={(e) =>
                          setFormData({ ...formData, text: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Главна снимка
                      </label>
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, "main_image");
                            }
                          }}
                          disabled={uploading === "main_image"}
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                        />
                        {uploading === "main_image" && (
                          <p className="text-sm text-[#495464]/70">
                            Качване...
                          </p>
                        )}
                        <input
                          type="url"
                          value={formData.main_image}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              main_image: e.target.value,
                            })
                          }
                          placeholder="Или въведи URL директно"
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                        />
                        {formData.main_image && (
                          <img
                            src={formData.main_image}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-[#E8E8E8]"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Автор
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Дата
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        placeholder="например: 24-30 ноември 2024"
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-[#495464]">
                          Позиция на изложбата
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPositionHelp(!showPositionHelp)}
                          className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                        >
                          {showPositionHelp
                            ? "Скрий информация"
                            : "Виж повече информация"}
                        </button>
                      </div>

                      {showPositionHelp && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-[#495464]">
                          <h4 className="font-semibold mb-2">
                            Как работи системата за позиции:
                          </h4>
                          <ul className="space-y-2 list-disc list-inside">
                            <li>
                              <strong>Позиция 0</strong> - Настояща изложба
                              (показва се с бейдж "Настояща")
                            </li>
                            <li>
                              <strong>Позиция 1, 2, 3...</strong> - Минали
                              изложби, сортирани по низходящ ред (по-голямата
                              цифра = по-скоро ще се покаже в списъка)
                            </li>
                            <li>
                              <strong>Позиция 1000</strong> - Архивирани изложби
                              (не се показват на публичната страница)
                            </li>
                          </ul>
                          <p className="mt-2 text-xs text-[#495464]/70">
                            Използвайте квадратчетата по-долу за бързо задаване
                            на позиция.
                          </p>
                        </div>
                      )}

                      {/* Position selector with cards */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {/* Current exhibition card */}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, position: 0 })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              formData.position === 0
                                ? "border-[#495464] bg-[#495464] text-white"
                                : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1 opacity-80">
                              Настояща изложба
                            </div>
                            <div className="text-lg font-bold">0</div>
                            {formData.position === 0 && (
                              <div className="text-xs mt-1 opacity-90">
                                ✓ Избрано
                              </div>
                            )}
                          </button>

                          {/* Past exhibitions cards - sorted by position descending */}
                          {exhibitions
                            .filter(
                              (ex) => ex.position > 0 && ex.position < 1000
                            )
                            .sort((a, b) => b.position - a.position)
                            .map((exhibition) => (
                              <button
                                key={exhibition.id}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    position: exhibition.position,
                                  })
                                }
                                className={`p-4 border-2 rounded-lg text-left transition-all ${
                                  formData.position === exhibition.position
                                    ? "border-[#495464] bg-[#495464] text-white"
                                    : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                                }`}
                              >
                                <div className="text-xs font-semibold mb-1 opacity-80">
                                  Позиция {exhibition.position}
                                </div>
                                <div className="text-sm font-medium line-clamp-2">
                                  {exhibition.title}
                                </div>
                                {formData.position === exhibition.position && (
                                  <div className="text-xs mt-1 opacity-90">
                                    ✓ Избрано
                                  </div>
                                )}
                              </button>
                            ))}

                          {/* Archived card */}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, position: 1000 })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              formData.position === 1000
                                ? "border-gray-500 bg-gray-500 text-white"
                                : "border-[#E8E8E8] bg-white text-[#495464] hover:border-gray-400"
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1 opacity-80">
                              Позиция 1000
                            </div>
                            <div className="text-lg font-bold">Архивирани</div>
                            {formData.position === 1000 && (
                              <div className="text-xs mt-1 opacity-90">
                                ✓ Избрано
                              </div>
                            )}
                          </button>
                        </div>

                        {/* Manual input as fallback */}
                        <div>
                          <label className="block text-xs text-[#495464]/70 mb-1">
                            Или въведи позиция ръчно:
                          </label>
                          <input
                            type="number"
                            value={formData.position}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                position: parseInt(e.target.value) || 0,
                              })
                            }
                            min="0"
                            className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Slug (URL-friendly, автоматично се генерира от
                        заглавието)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder="автоматично"
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-[#495464]">
                          Снимки и видеа за галерията (неограничен брой)
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={addImageField}
                            className="text-sm bg-[#495464] text-white px-3 py-1 rounded hover:bg-[#3a4149] transition-colors"
                          >
                            + Добави снимка
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                images: [...formData.images, ""],
                              });
                            }}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          >
                            + Добави видео
                          </button>
                        </div>
                      </div>
                      {formData.images.map((image, index) => {
                        const isYouTube = /youtube\.com|youtu\.be/.test(image);
                        return (
                          <div key={index} className="mb-4 space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(
                                      file,
                                      `image_${index + 1}` as `image_${number}`
                                    );
                                  }
                                }}
                                disabled={uploading === `image_${index + 1}`}
                                className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                              />
                              <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Премахни
                              </button>
                            </div>
                            {uploading === `image_${index + 1}` && (
                              <p className="text-sm text-[#495464]/70">
                                Качване...
                              </p>
                            )}
                            <input
                              type="url"
                              value={image}
                              onChange={(e) =>
                                handleImageChange(index, e.target.value)
                              }
                              placeholder={
                                isYouTube
                                  ? `Видео ${index + 1} (YouTube линк)`
                                  : `Снимка ${index + 1} (URL или качи файл) или YouTube линк за видео`
                              }
                              className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                            />
                            {image && isYouTube && (
                              <div className="w-full rounded-lg border border-[#E8E8E8] overflow-hidden">
                                <div className="aspect-video bg-black flex items-center justify-center">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${image.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^?&]+)/)?.[1] || ""}`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                                <p className="text-xs text-[#495464]/70 p-2 bg-[#E8E8E8]/50">
                                  YouTube видео
                                </p>
                              </div>
                            )}
                            {image && !isYouTube && (
                              <img
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-[#E8E8E8]"
                              />
                            )}
                          </div>
                        );
                      })}
                      {formData.images.length === 0 && (
                        <p className="text-sm text-[#495464]/70">
                          Няма добавени снимки или видеа. Натиснете "Добави снимка" или "Добави видео" за да добавите.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
                      >
                        Запази промените
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingExhibition(null);
                        }}
                        className="bg-gray-200 text-[#495464] px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Откажи
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Modal overlay for adding new exhibition */}
          {showForm && !editingExhibition && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => {
                  setShowForm(false);
                  setEditingExhibition(null);
                }}
              />
              {/* Modal panel */}
              <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b border-[#E8E8E8]">
                  <h2 className="text-2xl font-bold text-[#495464]">
                    Добави нова изложба
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingExhibition(null);
                    }}
                    className="text-[#495464] hover:text-[#3a4149] transition-colors p-2 hover:bg-[#E8E8E8] rounded-lg"
                    aria-label="Затвори"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Заглавие *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Подзаглавие
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Текст
                      </label>
                      <textarea
                        value={formData.text}
                        onChange={(e) =>
                          setFormData({ ...formData, text: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Главна снимка
                      </label>
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, "main_image");
                            }
                          }}
                          disabled={uploading === "main_image"}
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                        />
                        {uploading === "main_image" && (
                          <p className="text-sm text-[#495464]/70">
                            Качване...
                          </p>
                        )}
                        <input
                          type="url"
                          value={formData.main_image}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              main_image: e.target.value,
                            })
                          }
                          placeholder="Или въведи URL директно"
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                        />
                        {formData.main_image && (
                          <img
                            src={formData.main_image}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-[#E8E8E8]"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Автор
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Дата
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        placeholder="например: 24-30 ноември 2024"
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-[#495464]">
                          Позиция на изложбата
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPositionHelp(!showPositionHelp)}
                          className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                        >
                          {showPositionHelp
                            ? "Скрий информация"
                            : "Виж повече информация"}
                        </button>
                      </div>

                      {showPositionHelp && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-[#495464]">
                          <h4 className="font-semibold mb-2">
                            Как работи системата за позиции:
                          </h4>
                          <ul className="space-y-2 list-disc list-inside">
                            <li>
                              <strong>Позиция 0</strong> - Настояща изложба
                              (показва се с бейдж "Настояща")
                            </li>
                            <li>
                              <strong>Позиция 1, 2, 3...</strong> - Минали
                              изложби, сортирани по низходящ ред (по-голямата
                              цифра = по-скоро ще се покаже в списъка)
                            </li>
                            <li>
                              <strong>Позиция 1000</strong> - Архивирани изложби
                              (не се показват на публичната страница)
                            </li>
                          </ul>
                          <p className="mt-2 text-xs text-[#495464]/70">
                            Използвайте квадратчетата по-долу за бързо задаване
                            на позиция.
                          </p>
                        </div>
                      )}

                      {/* Position selector with cards */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {/* Current exhibition card */}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, position: 0 })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              formData.position === 0
                                ? "border-[#495464] bg-[#495464] text-white"
                                : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1 opacity-80">
                              Настояща изложба
                            </div>
                            <div className="text-lg font-bold">0</div>
                            {formData.position === 0 && (
                              <div className="text-xs mt-1 opacity-90">
                                ✓ Избрано
                              </div>
                            )}
                          </button>

                          {/* Past exhibitions cards - sorted by position descending */}
                          {exhibitions
                            .filter(
                              (ex) => ex.position > 0 && ex.position < 1000
                            )
                            .sort((a, b) => b.position - a.position)
                            .map((exhibition) => (
                              <button
                                key={exhibition.id}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    position: exhibition.position,
                                  })
                                }
                                className={`p-4 border-2 rounded-lg text-left transition-all ${
                                  formData.position === exhibition.position
                                    ? "border-[#495464] bg-[#495464] text-white"
                                    : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                                }`}
                              >
                                <div className="text-xs font-semibold mb-1 opacity-80">
                                  Позиция {exhibition.position}
                                </div>
                                <div className="text-sm font-medium line-clamp-2">
                                  {exhibition.title}
                                </div>
                                {formData.position === exhibition.position && (
                                  <div className="text-xs mt-1 opacity-90">
                                    ✓ Избрано
                                  </div>
                                )}
                              </button>
                            ))}

                          {/* Archived card */}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, position: 1000 })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              formData.position === 1000
                                ? "border-gray-500 bg-gray-500 text-white"
                                : "border-[#E8E8E8] bg-white text-[#495464] hover:border-gray-400"
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1 opacity-80">
                              Позиция 1000
                            </div>
                            <div className="text-lg font-bold">Архивирани</div>
                            {formData.position === 1000 && (
                              <div className="text-xs mt-1 opacity-90">
                                ✓ Избрано
                              </div>
                            )}
                          </button>
                        </div>

                        {/* Manual input as fallback */}
                        <div>
                          <label className="block text-xs text-[#495464]/70 mb-1">
                            Или въведи позиция ръчно:
                          </label>
                          <input
                            type="number"
                            value={formData.position}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                position: parseInt(e.target.value) || 0,
                              })
                            }
                            min="0"
                            className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#495464] mb-1">
                        Slug (URL-friendly, автоматично се генерира от
                        заглавието)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder="автоматично"
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-[#495464]">
                          Снимки за галерията (неограничен брой)
                        </label>
                        <button
                          type="button"
                          onClick={addImageField}
                          className="text-sm bg-[#495464] text-white px-3 py-1 rounded hover:bg-[#3a4149] transition-colors"
                        >
                          + Добави снимка
                        </button>
                      </div>
                      {formData.images.map((image, index) => (
                        <div key={index} className="mb-4 space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(
                                    file,
                                    `image_${index + 1}` as `image_${number}`
                                  );
                                }
                              }}
                              disabled={uploading === `image_${index + 1}`}
                              className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                            />
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Премахни
                            </button>
                          </div>
                          {uploading === `image_${index + 1}` && (
                            <p className="text-sm text-[#495464]/70">
                              Качване...
                            </p>
                          )}
                          <input
                            type="url"
                            value={image}
                            onChange={(e) =>
                              handleImageChange(index, e.target.value)
                            }
                            placeholder={`Снимка ${
                              index + 1
                            } (URL или качи файл)`}
                            className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                          />
                          {image && (
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-[#E8E8E8]"
                            />
                          )}
                        </div>
                      ))}
                      {formData.images.length === 0 && (
                        <p className="text-sm text-[#495464]/70">
                          Няма добавени снимки. Натиснете "Добави снимка" за да
                          добавите.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
                      >
                        Създай изложба
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingExhibition(null);
                        }}
                        className="bg-gray-200 text-[#495464] px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Откажи
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            {/* Search bar */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Търси по име на изложба..."
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] text-[#495464]"
              />
            </div>

            {/* Current exhibition (position 0) */}
            {exhibitions.filter(
              (ex) =>
                ex.position === 0 &&
                (searchQuery === "" ||
                  ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (ex.subtitle &&
                    ex.subtitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())))
            ).length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#495464] mb-4">
                  Настояща изложба
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exhibitions
                    .filter(
                      (ex) =>
                        ex.position === 0 &&
                        (searchQuery === "" ||
                          ex.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (ex.subtitle &&
                            ex.subtitle
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())))
                    )
                    .map((exhibition) => (
                      <div
                        key={exhibition.id}
                        className="bg-white border-2 border-[#495464] rounded-lg overflow-hidden shadow-lg flex flex-col"
                      >
                        {/* Image */}
                        {exhibition.main_image ? (
                          <img
                            src={exhibition.main_image}
                            alt={exhibition.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-[#E8E8E8] flex items-center justify-center">
                            <p className="text-[#495464]/50 text-sm">
                              Няма снимка
                            </p>
                          </div>
                        )}

                        {/* Title */}
                        <div className="p-4 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-[#495464] text-white px-2 py-1 rounded font-semibold">
                              Настояща
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                            {exhibition.title}
                          </h3>
                        </div>

                        {/* Action buttons - below image */}
                        <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEdit(exhibition)}
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            Редактирай
                          </button>
                          <button
                            onClick={() => handleDelete(exhibition.id)}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Изтрий
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Other exhibitions */}
            <div>
              <h2 className="text-2xl font-bold text-[#495464] mb-4">
                Съществуващи изложби (
                {
                  exhibitions.filter(
                    (ex) =>
                      ex.position !== 1000 &&
                      ex.position !== 0 &&
                      (searchQuery === "" ||
                        ex.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (ex.subtitle &&
                          ex.subtitle
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())))
                  ).length
                }
                )
              </h2>

              {exhibitions.filter(
                (ex) =>
                  ex.position !== 1000 &&
                  ex.position !== 0 &&
                  (searchQuery === "" ||
                    ex.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    (ex.subtitle &&
                      ex.subtitle
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())))
              ).length === 0 ? (
                <p className="text-[#495464]/70">
                  {searchQuery
                    ? "Няма изложби, отговарящи на търсенето."
                    : "Няма други изложби."}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exhibitions
                    .filter(
                      (ex) =>
                        ex.position !== 1000 &&
                        ex.position !== 0 &&
                        (searchQuery === "" ||
                          ex.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (ex.subtitle &&
                            ex.subtitle
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())))
                    )
                    .sort((a, b) => b.position - a.position)
                    .map((exhibition) => (
                      <div
                        key={exhibition.id}
                        className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-md flex flex-col"
                      >
                        {/* Image */}
                        {exhibition.main_image ? (
                          <img
                            src={exhibition.main_image}
                            alt={exhibition.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-[#E8E8E8] flex items-center justify-center">
                            <p className="text-[#495464]/50 text-sm">
                              Няма снимка
                            </p>
                          </div>
                        )}

                        {/* Title */}
                        <div className="p-4 flex-1">
                          <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                            {exhibition.title}
                          </h3>
                        </div>

                        {/* Action buttons - below image */}
                        <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEdit(exhibition)}
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            Редактирай
                          </button>
                          <button
                            onClick={() => handleDelete(exhibition.id)}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Изтрий
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Archived exhibitions section */}
            {exhibitions.filter((ex) => ex.position === 1000).length > 0 && (
              <div className="mt-12 space-y-4">
                <h2 className="text-2xl font-bold text-[#495464] mb-4">
                  Архивирани изложби (
                  {
                    exhibitions.filter(
                      (ex) =>
                        ex.position === 1000 &&
                        (searchQuery === "" ||
                          ex.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (ex.subtitle &&
                            ex.subtitle
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())))
                    ).length
                  }
                  )
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exhibitions
                    .filter(
                      (ex) =>
                        ex.position === 1000 &&
                        (searchQuery === "" ||
                          ex.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (ex.subtitle &&
                            ex.subtitle
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())))
                    )
                    .map((exhibition) => (
                      <div
                        key={exhibition.id}
                        className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col opacity-75"
                      >
                        {/* Image */}
                        {exhibition.main_image ? (
                          <img
                            src={exhibition.main_image}
                            alt={exhibition.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <p className="text-[#495464]/50 text-sm">
                              Няма снимка
                            </p>
                          </div>
                        )}

                        {/* Title */}
                        <div className="p-4 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                              Архивирана
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                            {exhibition.title}
                          </h3>
                        </div>

                        {/* Action buttons - below image */}
                        <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEdit(exhibition)}
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            Редактирай
                          </button>
                          <button
                            onClick={() => handleDelete(exhibition.id)}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Изтрий
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

