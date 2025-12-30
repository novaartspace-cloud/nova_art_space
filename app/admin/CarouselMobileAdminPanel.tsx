"use client";

import { useState, useEffect } from "react";

interface CarouselMobileSlide {
  id: string;
  image_url: string;
  link_url: string;
  position: number;
}

export default function CarouselMobileAdminPanel() {
  const [slides, setSlides] = useState<CarouselMobileSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<CarouselMobileSlide | null>(null);
  const [formData, setFormData] = useState({
    image_url: "",
    link_url: "",
    position: 0,
  });
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/carousel-mobile");
      if (!response.ok) {
        // If table doesn't exist, just return empty array
        const errorData = await response.json().catch(() => ({}));
        if (errorData.error?.includes('does not exist') || errorData.error?.includes('relation')) {
          console.warn("Carousel mobile slides table does not exist yet. Please run the SQL script to create it.");
          setSlides([]);
          setLoading(false);
          return;
        }
        // For other errors, still set empty array
        setSlides([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      // Ensure data is always an array
      setSlides(Array.isArray(data) ? data : []);
    } catch (error: any) {
      // Silently handle errors - table might not exist yet
      if (error?.message?.includes('does not exist') || error?.message?.includes('relation')) {
        console.warn("Carousel mobile slides table does not exist yet. Please run the SQL script to create it.");
      }
      setSlides([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (field: "image_url") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(field);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.url) {
          setFormData((prev) => ({ ...prev, [field]: data.url }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Грешка при качване на снимката");
      } finally {
        setUploading(null);
      }
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url || !formData.link_url) {
      alert("Моля, попълнете всички задължителни полета");
      return;
    }

    try {
      if (editingSlide) {
        // Update existing slide
        const response = await fetch(`/api/carousel-mobile/${editingSlide.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Грешка при обновяване");
        }
      } else {
        // Create new slide
        const response = await fetch("/api/carousel-mobile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Грешка при създаване");
        }
      }

      await fetchSlides();
      setShowForm(false);
      setEditingSlide(null);
      setFormData({
        image_url: "",
        link_url: "",
        position: 0,
      });
    } catch (error: any) {
      alert(error.message || "Грешка при запазване");
    }
  };

  const handleEdit = (slide: CarouselMobileSlide) => {
    setEditingSlide(slide);
    setFormData({
      image_url: slide.image_url,
      link_url: slide.link_url,
      position: slide.position,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този слайд?")) {
      return;
    }

    try {
      const response = await fetch(`/api/carousel-mobile/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Грешка при изтриване");
      }

      await fetchSlides();
    } catch (error) {
      alert("Грешка при изтриване на слайда");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-[#495464]">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#495464] mb-4">Слайдер за телефон</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingSlide(null);
            setFormData({
              image_url: "",
              link_url: "",
              position: 0,
            });
          }}
          className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
        >
          {showForm ? "Откажи" : "+ Добави нов слайд"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[#E8E8E8] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#495464] mb-4">
            {editingSlide ? "Редактирай слайд" : "Добави нов слайд"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Линк към снимка *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  required
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                />
                <button
                  type="button"
                  onClick={() => handleImageUpload("image_url")}
                  disabled={uploading === "image_url"}
                  className="px-4 py-2 bg-[#495464] text-white rounded-lg hover:bg-[#3a4149] transition-colors disabled:opacity-50"
                >
                  {uploading === "image_url" ? "Качване..." : "Качи"}
                </button>
              </div>
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-2 max-w-xs h-32 object-cover rounded"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Линк (URL) *
              </label>
              <input
                type="text"
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                required
                placeholder="/izlozhbi или https://..."
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Позиция
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
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
              />
              <p className="text-xs text-[#495464]/70 mt-1">
                По-ниските числа се показват първи
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
              >
                {editingSlide ? "Запази промените" : "Добави слайд"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingSlide(null);
                  setFormData({
                    image_url: "",
                    link_url: "",
                    position: 0,
                  });
                }}
                className="px-6 py-2 border border-[#E8E8E8] text-[#495464] rounded-lg hover:bg-[#E8E8E8] transition-colors"
              >
                Откажи
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#E8E8E8]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Снимка
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Линк
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Позиция
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E8E8]">
              {!Array.isArray(slides) || slides.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-[#495464]/70">
                    Няма добавени слайдове
                  </td>
                </tr>
              ) : (
                slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-[#E8E8E8]/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={slide.image_url}
                        alt="Slide"
                        className="w-20 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={slide.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#495464] hover:text-[#3a4149] underline"
                      >
                        {slide.link_url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#495464]">
                      {slide.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="text-[#495464] hover:text-[#3a4149] mr-4"
                      >
                        Редактирай
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Изтрий
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

