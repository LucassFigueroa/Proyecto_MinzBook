// src/data/book.ts

export interface FeaturedBook {
  id: number;      // 👈 usamos este id para navegar a /books/:id
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  image: string;   // imagen estática en el front
  description: string;
}

export const featuredBooks: FeaturedBook[] = [
  {
    id: 1,
    isbn: "978-00-00001",
    title: "El terror de la jungla",
    author: "SANSER",
    genre: "Aventura",
    price: 7500,
    image: "/img/libro1.jpg",
    description:
      "Una historia de supervivencia en lo más profundo de la selva, donde el miedo se convierte en el peor enemigo.",
  },
  {
    id: 2,
    isbn: "978-00-00002",
    title: "La ayuda es un beneficio?",
    author: "SKADI",
    genre: "Ensayo",
    price: 7500,
    image: "/img/libro2.jpg",
    description:
      "Una reflexión profunda sobre la empatía, la dependencia y el verdadero sentido de ayudar a los demás.",
  },
  {
    id: 3,
    isbn: "978-00-00003",
    title: "Control de oleadas",
    author: "WERLYB",
    genre: "Estrategia",
    price: 7500,
    image: "/img/libro3.jpg",
    description:
      "Guía esencial para mantener el equilibrio entre la acción y la paciencia en un mundo lleno de caos.",
  },
  {
    id: 4,
    isbn: "978-00-00004",
    title: "La ciencia de la victoria",
    author: "GABOXYIYI",
    genre: "Superación",
    price: 444444,
    image: "/img/libro4.jpg",
    description:
      "Descubre la mentalidad detrás del éxito, la disciplina y el poder de la constancia para lograr tus metas.",
  },
  {
    id: 5,
    isbn: "978-00-00008",
    title: "Mega Man: Official Complete Works",
    author: "Capcom",
    genre: "ArtBook",
    price: 120000,
    image: "/img/libro5.jpg",
    description:
      "Con más de 100 videojuegos a su nombre, Mega Man es uno de los íconos más reconocibles de los videojuegos. Este libro exhibe 20 años de arte y diseños oficiales.",
  },
  {
    id: 6,
    isbn: "978-00-00009",
    title: "The Legend of Zelda: Art & Artifacts",
    author: "Nintendo",
    genre: "Juegos, Obra",
    price: 87500,
    image: "/img/libro6.jpg",
    description:
      "Más de 400 páginas de ilustraciones de los 30 años de historia de The Legend of Zelda™, impresas en papel de alta calidad.",
  },
];
