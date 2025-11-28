package minzbookweb.catalogserviceweb.service;

import minzbookweb.catalogserviceweb.dto.BookRequest;
import minzbookweb.catalogserviceweb.dto.BookResponse;
import minzbookweb.catalogserviceweb.model.Book;
import minzbookweb.catalogserviceweb.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> getAll() {
        return repo.findAll();
    }

    public Book getByIsbn(String isbn) {
        return repo.findByIsbn(isbn)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
    }

    public Book create(BookRequest dto) {
        Book b = new Book();
        b.setIsbn(dto.getIsbn());
        b.setTitle(dto.getTitle());
        b.setAuthor(dto.getAuthor());
        b.setGenre(dto.getGenre());
        b.setPrice(dto.getPrice());
        b.setCoverUrl(dto.getCoverUrl());
        b.setDescription(dto.getDescription());
        b.setPostedByUserId(dto.getPostedByUserId());
        return repo.save(b);
    }

    public Book update(String isbn, BookRequest dto) {
        Book b = getByIsbn(isbn);
        b.setTitle(dto.getTitle());
        b.setAuthor(dto.getAuthor());
        b.setGenre(dto.getGenre());
        b.setPrice(dto.getPrice());
        b.setCoverUrl(dto.getCoverUrl());
        b.setDescription(dto.getDescription());
        return repo.save(b);
    }

    public void delete(String isbn) {
        Book b = getByIsbn(isbn);
        repo.delete(b);
    }

    public List<Book> search(String q) {
        return repo.findByTitleContainingIgnoreCase(q);
    }

    public List<Book> byAuthor(String author) {
        return repo.findByAuthorContainingIgnoreCase(author);
    }

    public List<Book> byGenre(String genre) {
        return repo.findByGenreContainingIgnoreCase(genre);
    }
}
