package minzbookweb.catalogserviceweb.repository;

import minzbookweb.catalogserviceweb.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("""
        SELECT b FROM Book b
        WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(b.description) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(b.author) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Book> search(String q);

    // Filtrar por género
    List<Book> findByGenreContainingIgnoreCase(String genre);

    // Filtrar por autor
    List<Book> findByAuthorContainingIgnoreCase(String author);
}
