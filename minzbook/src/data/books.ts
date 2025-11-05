export interface Book {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  image: string;
  description: string;
}

export const books: Book[] = [
  {
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
    isbn: "978-00-00004",
    title: "La ciencia de la victoria",
    author: "GABOXYIYI",
    genre: "Superación",
    price: 444444,
    image: "/img/libro4.jpg",
    description:
      "Descubre la mentalidad detrás del éxito, la disciplina y el poder de la constancia para lograr tus metas.",
  },
];
