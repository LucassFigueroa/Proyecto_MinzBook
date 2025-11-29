// src/pages/Author.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { createBook, uploadBookCover, CreateBookPayload } from "@/api/booksApi";

interface BookForm {
  title: string;
  author: string;
  description: string;
  price: string;   // lo convertimos a number al guardar
  isbn: string;
  genre: string;
}

export default function AuthorPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [book, setBook] = useState<BookForm>({
    title: "",
    author: "",
    description: "",
    price: "",
    coverUrl: "",
    isbn: "",
    genre: "",
  } as any); // coverUrl lo agregamos en payload, no en el form

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 📸 Cargar imagen de portada (solo preview + archivo)
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Debes iniciar sesión para publicar un libro 💧");
      return;
    }

    if (
      !book.title.trim() ||
      !book.author.trim() ||
      !book.description.trim() ||
      !book.price
    ) {
      alert("Por favor completa todos los campos obligatorios 💧");
      return;
    }

    setSubmitting(true);

    try {
      // 1) Subir portada si hay archivo
      let coverUrl: string | undefined;
      if (coverFile) {
        coverUrl = await uploadBookCover(coverFile);
      }

      // 2) Generar ISBN si el campo está vacío
      const isbn =
        book.isbn.trim().length > 0
          ? book.isbn.trim()
          : crypto.randomUUID();

      const payload: CreateBookPayload = {
        isbn,
        title: book.title.trim(),
        author: book.author.trim(),
        description: book.description.trim(),
        price: Number(book.price),
        genre: book.genre.trim(),
        coverUrl,
        postedByUserId: user?.id,
      };

      const created = await createBook(payload);

      alert(`📚 Libro "${created.title}" publicado con éxito`);
      console.log("Libro publicado:", created);

      // 3) Limpiar formulario
      setBook({
        title: "",
        author: "",
        description: "",
        price: "",
        isbn: "",
        genre: "",
      });
      setCoverFile(null);
      setPreview(null);

      // 4) Ir al catálogo para verlo listado
      navigate("/catalog");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al publicar el libro");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <h2
        className="text-center mb-4"
        style={{ color: "var(--color-verde)" }}
      >
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

        {/* Género */}
        <div className="mb-3">
          <label className="form-label fw-bold">Género</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ejemplo: Fantasía, Aventura, Romance..."
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
          />
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
              setBook({ ...book, price: e.target.value })
            }
            required
          />
        </div>

        {/* ISBN opcional */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            ISBN (opcional, se genera uno si lo dejas vacío)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ejemplo: 978-3-16-148410-0"
            value={book.isbn}
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
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

        <button
          type="submit"
          className="btn btn-success w-100 fw-bold mt-3"
          disabled={submitting}
        >
          {submitting ? "Publicando..." : "Publicar libro"}
        </button>
      </form>
    </div>
  );
}
