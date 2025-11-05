import { useState, ChangeEvent } from "react";
import { books as baseBooks } from "@/data/books";

interface Book {
  title: string;
  author: string;
  description: string;
  price: number;
  cover?: string;
  isbn: string;
  genre?: string;
}

export default function AuthorPage() {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    description: "",
    price: 0,
    cover: "",
    isbn: "",
    genre: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 📸 Cargar imagen de portada
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setBook({ ...book, cover: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // 💾 Guardar libro nuevo (fusionado con los existentes)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.description || !book.price) {
      alert("Por favor completa todos los campos 💧");
      return;
    }

    // Generar ISBN simple
    const newBook: Book = {
      ...book,
      isbn: crypto.randomUUID(),
    };

    // Guardar en localStorage junto con los libros base
    const savedBooks = JSON.parse(localStorage.getItem("customBooks") || "[]");
    const updatedBooks = [...savedBooks, newBook];
    localStorage.setItem("customBooks", JSON.stringify(updatedBooks));

    alert(`📚 Libro "${book.title}" publicado con éxito`);
    console.log("Libro publicado:", newBook);

    // Limpiar formulario
    setBook({
      title: "",
      author: "",
      description: "",
      price: 0,
      cover: "",
      isbn: "",
      genre: "",
    });
    setPreview(null);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <h2 className="text-center mb-4" style={{ color: "var(--color-verde)" }}>
        Publicar nuevo libro
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#fffaf3" }}
      >
        {/* Título */}
        <div className="mb-3">
          <label className="form-label fw-bold">Título del libro</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ejemplo: La casa de los espíritus"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>

        {/* Autor */}
        <div className="mb-3">
          <label className="form-label fw-bold">Autor del libro</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ejemplo: Isabel Allende"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label fw-bold">Descripción</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Escribe una breve sinopsis del libro..."
            value={book.description}
            onChange={(e) =>
              setBook({ ...book, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label fw-bold">Precio</label>
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="Ejemplo: 14990"
            value={book.price}
            onChange={(e) =>
              setBook({ ...book, price: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* Subir portada */}
        <div className="mb-3">
          <label className="form-label fw-bold">Portada del libro</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleCoverChange}
          />

          {/* Vista previa */}
          {preview && (
            <div className="mt-4 text-center">
              <h6 className="text-muted mb-2">Vista previa de la portada</h6>
              <img
                src={preview}
                alt="Portada del libro"
                style={{
                  width: "200px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "3px solid var(--color-verde)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold mt-3">
          Publicar libro
        </button>
      </form>
    </div>
  );
}
