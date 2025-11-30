package minzbookweb.reviewserviceweb.controller;

import minzbookweb.reviewserviceweb.dto.CreateReviewRequest;
import minzbookweb.reviewserviceweb.dto.UpdateReviewRequest;
import minzbookweb.reviewserviceweb.model.Review;
import minzbookweb.reviewserviceweb.service.ReviewService;
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
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(
        name = "Reseñas",
        description = "Endpoints para crear, actualizar, desactivar y obtener reseñas de libros."
)
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // Crear reseña: POST /api/reviews
    @Operation(
            summary = "Crear una nueva reseña",
            description = "Crea una reseña para un libro específico asociada a un usuario."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Reseña creada correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Review.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos en la petición"
            )
    })
    @PostMapping
    public Review create(@RequestBody CreateReviewRequest req) {
        return service.create(req);
    }

    // Obtener reseñas por ID de libro: GET /api/reviews/book/{bookId}
    @Operation(
            summary = "Obtener reseñas por libro",
            description = "Devuelve todas las reseñas activas asociadas a un libro a partir de su ID/ISBN."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Listado de reseñas del libro",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Review.class))
                    )
            )
    })
    @GetMapping("/book/{bookId}")
    public List<Review> getByBookId(@PathVariable String bookId) {
        return service.byBook(bookId);
    }

    // Actualizar reseña: PUT /api/reviews/{id}
    @Operation(
            summary = "Actualizar una reseña",
            description = "Modifica la puntuación y/o comentario de una reseña existente."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Reseña actualizada correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Review.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró la reseña con el ID indicado"
            )
    })
    @PutMapping("/{id}")
    public Review update(
            @PathVariable Long id,
            @RequestBody UpdateReviewRequest req
    ) {
        return service.update(id, req);
    }

    // Eliminar / desactivar reseña: DELETE /api/reviews/{id}?reason=...
    @Operation(
            summary = "Desactivar una reseña",
            description = "Desactiva lógicamente una reseña y guarda el motivo de eliminación."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Reseña desactivada correctamente"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró la reseña con el ID indicado"
            )
    })
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            @RequestParam(required = false) String reason
    ) {
        String finalReason = (reason != null && !reason.isBlank())
                ? reason
                : "Eliminada por el usuario";
        service.delete(id, finalReason);
    }
}
