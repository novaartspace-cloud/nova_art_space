"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminPanel() {
  const router = useRouter();
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
    images: ["", "", "", "", ""],
  });
  const [uploading, setUploading] = useState<string | null>(null); // Track which field is uploading

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
        images: ["", "", "", "", ""],
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
      images: [
        ...exhibition.images,
        ...Array(5 - exhibition.images.length).fill(""),
      ].slice(0, 5),
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

  const handleFileUpload = async (
    file: File,
    field: "main_image" | `image_${1 | 2 | 3 | 4 | 5}`
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
          const currentImages = prev.images || ["", "", "", "", ""];

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
          <h1 className="text-2xl font-bold">Админ Панел - Изложби</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-[#495464] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Изход
          </button>
        </div>
      </div>

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
                images: ["", "", "", "", ""],
              });
            }}
            className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
          >
            {showForm ? "Откажи" : "+ Добави нова изложба"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-[#E8E8E8] rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-xl font-bold text-[#495464] mb-4">
              {editingExhibition ? "Редактирай изложба" : "Добави нова изложба"}
            </h2>
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
                    <p className="text-sm text-[#495464]/70">Качване...</p>
                  )}
                  <input
                    type="url"
                    value={formData.main_image}
                    onChange={(e) =>
                      setFormData({ ...formData, main_image: e.target.value })
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
                <label className="block text-sm font-medium text-[#495464] mb-1">
                  Позиция (0 = настояща, {">"}0 = минали)
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
              </div>

              <div>
                <label className="block text-sm font-medium text-[#495464] mb-1">
                  Slug (URL-friendly, автоматично се генерира от заглавието)
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
                <label className="block text-sm font-medium text-[#495464] mb-2">
                  Снимки за галерията
                </label>
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
                              `image_${index + 1}` as `image_${
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5}`
                            );
                          }
                        }}
                        disabled={uploading === `image_${index + 1}`}
                        className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                      />
                    </div>
                    {uploading === `image_${index + 1}` && (
                      <p className="text-sm text-[#495464]/70">Качване...</p>
                    )}
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Снимка ${index + 1} (URL или качи файл)`}
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
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
                >
                  {editingExhibition ? "Запази промените" : "Създай изложба"}
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
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#495464] mb-4">
            Съществуващи изложби ({exhibitions.length})
          </h2>

          {exhibitions.length === 0 ? (
            <p className="text-[#495464]/70">Няма изложби. Добави първата!</p>
          ) : (
            exhibitions.map((exhibition) => (
              <div
                key={exhibition.id}
                className="bg-white border border-[#E8E8E8] rounded-lg p-6 shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#495464]">
                      {exhibition.title}
                    </h3>
                    {exhibition.subtitle && (
                      <p className="text-[#495464]/70 mt-1">
                        {exhibition.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-[#495464]/60 mt-2">
                      Позиция: {exhibition.position} | Slug: {exhibition.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exhibition)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Редактирай
                    </button>
                    <button
                      onClick={() => handleDelete(exhibition.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Изтрий
                    </button>
                  </div>
                </div>
                {exhibition.main_image && (
                  <img
                    src={exhibition.main_image}
                    alt={exhibition.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <p className="text-[#495464]/80 text-sm line-clamp-3">
                  {exhibition.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

