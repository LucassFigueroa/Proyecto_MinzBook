package minzbookweb.catalogserviceweb.controller;

import minzbookweb.catalogserviceweb.dto.BookRequest;
import minzbookweb.catalogserviceweb.model.Book;
import minzbookweb.catalogserviceweb.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Swagger
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(
        name = "Libros",
        description = "Endpoints para gestionar el catálogo de libros: CRUD, búsqueda y filtros."
)
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @Operation(
            summary = "Listar todos los libros",
            description = "Obtiene la lista completa de libros disponibles en el catálogo."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de libros obtenida correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Book.class))
                    )
            )
    })
    @GetMapping
    public List<Book> all() {
        return service.getAll();
    }

    @Operation(
            summary = "Obtener un libro por ID",
            description = "Devuelve la información de un libro específico según su ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Libro encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Book.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró un libro con el ID indicado"
            )
    })
    @GetMapping("/{id}")
    public Book one(@PathVariable Long id) {
        return service.getById(id);
    }

    @Operation(
            summary = "Crear un nuevo libro",
            description = "Crea un nuevo libro en el catálogo a partir de los datos enviados por el frontend."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Libro creado correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Book.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos en la petición"
            )
    })
    @PostMapping
    public Book create(@RequestBody BookRequest dto) {
        return service.create(dto);
    }

    @Operation(
            summary = "Actualizar un libro existente",
            description = "Actualiza los datos de un libro identificado por su ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Libro actualizado correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Book.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró un libro con el ID indicado"
            )
    })
    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody BookRequest dto) {
        return service.update(id, dto);
    }

    @Operation(
            summary = "Eliminar un libro",
            description = "Elimina un libro del catálogo según su ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Libro eliminado correctamente"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró un libro con el ID indicado"
            )
    })
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @Operation(
            summary = "Buscar libros por texto",
            description = "Busca libros cuyo título, autor u otros campos coincidan con el parámetro de búsqueda."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Resultados de la búsqueda",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Book.class))
                    )
            )
    })
    @GetMapping("/search")
    public List<Book> search(@RequestParam String q) {
        return service.search(q);
    }

    @Operation(
            summary = "Listar libros por género",
            description = "Obtiene todos los libros que pertenecen a un género específico."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de libros filtrada por género",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Book.class))
                    )
            )
    })
    @GetMapping("/genre")
    public List<Book> byGenre(@RequestParam String genre) {
        return service.byGenre(genre);
    }

    @Operation(
            summary = "Listar libros por autor",
            description = "Obtiene todos los libros publicados por un autor específico."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de libros filtrada por autor",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Book.class))
                    )
            )
    })
    @GetMapping("/author")
    public List<Book> byAuthor(@RequestParam String author) {
        return service.byAuthor(author);
    }
}
