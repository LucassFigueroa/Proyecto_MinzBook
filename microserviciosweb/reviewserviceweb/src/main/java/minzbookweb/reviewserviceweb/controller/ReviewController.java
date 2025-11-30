package minzbookweb.reviewserviceweb.controller;

import minzbookweb.reviewserviceweb.dto.CreateReviewRequest;
import minzbookweb.reviewserviceweb.dto.UpdateReviewRequest;
import minzbookweb.reviewserviceweb.model.Review;
import minzbookweb.reviewserviceweb.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // Crear reseña: POST /api/reviews
    @PostMapping
    public Review create(@RequestBody CreateReviewRequest req) {
        return service.create(req);
    }

    // Obtener reseñas por ID de libro: GET /api/reviews/book/{bookId}
    @GetMapping("/book/{bookId}")
    public List<Review> getByBookId(@PathVariable String bookId) {
        return service.byBook(bookId);
    }

    // Actualizar reseña: PUT /api/reviews/{id}
    @PutMapping("/{id}")
    public Review update(
            @PathVariable Long id,
            @RequestBody UpdateReviewRequest req
    ) {
        return service.update(id, req);
    }

    // Eliminar / desactivar reseña: DELETE /api/reviews/{id}?reason=...
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            @RequestParam(required = false) String reason
    ) {
        // si no mandas razón, usa una genérica
        String finalReason = (reason != null && !reason.isBlank())
                ? reason
                : "Eliminada por el usuario";
        service.delete(id, finalReason);
    }
}
