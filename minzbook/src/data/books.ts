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
  {
    isbn: "978-00-00008",
    title: "Mega Man: Official Complete Works",
    author: "Capcom",
    genre: "ArtBook",
    price: 120000,
    image: "/img/libro5.jpg",
    description:
      "Con más de 100 videojuegos a su nombre, Mega Man es uno de los íconos más reconocibles de los videojuegos. Mega Man: Official Complete Works exhibe 20 años de arte de esta serie clásica e incluye diseños de personajes, carátulas, arte promocional y un montón de obras de arte poco comunes. ¡Ningún fan de Mega Man se lo puede perder!",
  },
  {
    isbn: "978-00-00009",
    title: "The Legend of Zelda: Art & Artifacts",
    author: "Nintendo",
    genre: "Juegos, Obra ",
    price: 87500,
    image: "/img/libro6.jpg",
    description:
      "The Legend of Zelda™: Art and Artifacts contiene más de cuatrocientas páginas de ilustraciones completas de los treinta años de historia de The Legend of Zelda™, incluyendo ilustraciones del próximo The Legend of Zelda™: Breath of the Wild. Cada obra maestra está impresa en papel de alta calidad en un formato extragrande para que puedas sumergirte en los detalles de cada pieza. Este libro incluye piezas promocionales raras, carátulas de juegos, ilustraciones para el manual de instrucciones, ilustraciones oficiales de los personajes, sprites, entrevistas con los artistas y mucho, mucho más. The Legend of Zelda™: Art and Artifacts recopila muchas de tus obras maestras favoritas de la legendaria franquicia, así como contenido exclusivo e inédito, presentado en una elegante tapa dura.",
  }
];
