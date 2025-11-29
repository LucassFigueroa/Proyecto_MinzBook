package minzbookweb.catalogserviceweb.service;

import minzbookweb.catalogserviceweb.dto.BookRequest;
import minzbookweb.catalogserviceweb.model.Book;
import minzbookweb.catalogserviceweb.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    // Obtener todos
    public List<Book> getAll() {
        return repository.findAll();
    }

    // Obtener por ID (ideal para React)
    public Book getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
    }

    // Crear
    public Book create(BookRequest dto) {
        Book book = new Book();

        book.setIsbn(dto.getIsbn());
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setPrice(dto.getPrice());
        book.setCoverUrl(dto.getCoverUrl());   // viene desde /api/upload
        book.setDescription(dto.getDescription());
        book.setPostedByUserId(dto.getPostedByUserId());

        return repository.save(book);
    }

    // Actualizar por ID
    public Book update(Long id, BookRequest dto) {
        Book book = getById(id);

        book.setIsbn(dto.getIsbn());
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setPrice(dto.getPrice());
        book.setCoverUrl(dto.getCoverUrl());
        book.setDescription(dto.getDescription());
        book.setPostedByUserId(dto.getPostedByUserId());

        return repository.save(book);
    }

    // Eliminar
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Libro no encontrado");
        }
        repository.deleteById(id);
    }

    // Búsquedas
    public List<Book> search(String q) {
        return repository.search(q);
    }

    public List<Book> byGenre(String genre) {
        return repository.findByGenreContainingIgnoreCase(genre);
    }

    public List<Book> byAuthor(String author) {
        return repository.findByAuthorContainingIgnoreCase(author);
    }
}
