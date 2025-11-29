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

    // Ahora todo por ID
    @GetMapping("/{id}")
    public Book one(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Book create(@RequestBody BookRequest dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody BookRequest dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
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
