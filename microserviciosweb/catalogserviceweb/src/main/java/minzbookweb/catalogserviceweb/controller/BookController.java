package minzbookweb.catalogserviceweb.controller;

import minzbookweb.catalogserviceweb.dto.BookRequest;
import minzbookweb.catalogserviceweb.model.Book;
import minzbookweb.catalogserviceweb.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List<Book> all() {
        return service.getAll();
    }

    @GetMapping("/{isbn}")
    public Book one(@PathVariable String isbn) {
        return service.getByIsbn(isbn);
    }

    @PostMapping
    public Book create(@RequestBody BookRequest dto) {
        return service.create(dto);
    }

    @PutMapping("/{isbn}")
    public Book update(@PathVariable String isbn, @RequestBody BookRequest dto) {
        return service.update(isbn, dto);
    }

    @DeleteMapping("/{isbn}")
    public void delete(@PathVariable String isbn) {
        service.delete(isbn);
    }

    @GetMapping("/search")
    public List<Book> search(@RequestParam String q) {
        return service.search(q);
    }

    @GetMapping("/genre")
    public List<Book> byGenre(@RequestParam String genre) {
        return service.byGenre(genre);
    }

    @GetMapping("/author")
    public List<Book> byAuthor(@RequestParam String author) {
        return service.byAuthor(author);
    }
}
