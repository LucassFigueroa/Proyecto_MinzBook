import { Link } from "react-router-dom";
import { Book } from "@/data/books";
import { useCart } from "@/context/CartContext";
import { money } from "@/lib/utils";

export default function BookCard({ book }: { book: Book }) {
  const { add } = useCart();

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        style={{ objectFit: "cover", height: "320px" }}
      />

      <div className="card-body d-flex flex-column">
        <div className="tag mb-2 text-uppercase small fw-semibold text-muted">
          {book.author}
        </div>

        <h5 className="card-title mb-1 fw-bold">{book.title}</h5>

        <div className="text-muted small mb-2">
          {book.genre} · ISBN {book.isbn}
        </div>

        <div className="price mb-3 fw-bold text-success">
          {money(book.price)}
        </div>

        <div className="mt-auto d-flex justify-content-between gap-2">
          {/* Botón Ver */}
          <Link
            className="btn btn-outline-success fw-semibold"
            to={`/book/${book.isbn}`}
          >
            Ver
          </Link>

          {/* Botón Añadir */}
          <button
            className="btn btn-outline-success fw-semibold"
            onClick={() =>
              add({
                id: book.isbn,
                title: book.title,
                price: book.price,
              })
            }
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
