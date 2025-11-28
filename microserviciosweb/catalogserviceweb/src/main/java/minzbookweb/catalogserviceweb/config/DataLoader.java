package minzbookweb.catalogserviceweb.config;

import minzbookweb.catalogserviceweb.model.Book;
import minzbookweb.catalogserviceweb.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final BookRepository repo;

    public DataLoader(BookRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {

        if (repo.count() > 0) {
            System.out.println("📚 Catalogo ya cargado, no se insertan libros iniciales.");
            return;
        }

        System.out.println("📚 Cargando libros iniciales...");

        repo.save(create(
                "978-00-00001",
                "El terror de la jungla",
                "SANSER",
                "Aventura",
                7500.0,
                "/images/libro1.jpg",
                "Una historia de supervivencia en lo más profundo de la selva, donde el miedo se convierte en el peor enemigo.",
                1L
        ));

        repo.save(create(
                "978-00-00002",
                "La ayuda es un beneficio?",
                "SKADI",
                "Ensayo",
                7500.0,
                "/images/libro2.jpg",
                "Una reflexión profunda sobre la empatía, la dependencia y el verdadero sentido de ayudar a los demás.",
                1L
        ));

        repo.save(create(
                "978-00-00003",
                "Control de oleadas",
                "WERLYB",
                "Estrategia",
                7500.0,
                "/images/libro3.jpg",
                "Guía esencial para mantener el equilibrio entre la acción y la paciencia en un mundo lleno de caos.",
                1L
        ));

        repo.save(create(
                "978-00-00004",
                "La ciencia de la victoria",
                "GABOXYIYI",
                "Superación",
                444444.0,
                "/images/libro4.jpg",
                "Descubre la mentalidad detrás del éxito, la disciplina y el poder de la constancia para lograr tus metas.",
                2L
        ));

        repo.save(create(
                "978-00-00008",
                "Mega Man: Official Complete Works",
                "Capcom",
                "ArtBook",
                120000.0,
                "/images/libro5.jpg",
                "Con más de 100 videojuegos a su nombre, Mega Man es uno de los íconos más reconocibles de los videojuegos. Este libro exhibe 20 años de arte y diseños oficiales.",
                3L
        ));

        repo.save(create(
                "978-00-00009",
                "The Legend of Zelda: Art & Artifacts",
                "Nintendo",
                "Juegos, Obra",
                87500.0,
                "/images/libro6.jpg",
                "Más de 400 páginas de ilustraciones de los 30 años de historia de The Legend of Zelda™, impresas en papel de alta calidad en un formato extragrande.",
                3L
        ));

        System.out.println("✅ Libros cargados correctamente.");
    }

    private Book create(
            String isbn,
            String title,
            String author,
            String genre,
            Double price,
            String coverUrl,
            String description,
            Long postedBy
    ) {
        Book b = new Book();
        b.setIsbn(isbn);
        b.setTitle(title);
        b.setAuthor(author);
        b.setGenre(genre);
        b.setPrice(price);
        b.setCoverUrl(coverUrl);
        b.setDescription(description);
        b.setPostedByUserId(postedBy);
        return b;
    }
}
