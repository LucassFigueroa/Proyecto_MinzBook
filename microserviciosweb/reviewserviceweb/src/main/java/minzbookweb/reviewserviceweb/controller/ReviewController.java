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

    @GetMapping
    public List<Review> all() {
        return service.all();
    }

    @GetMapping("/book/{isbn}")
    public List<Review> reviewsOfBook(@PathVariable String isbn) {
        return service.byBook(isbn);
    }

    @GetMapping("/user/{userId}")
    public List<Review> reviewsOfUser(@PathVariable Long userId) {
        return service.byUser(userId);
    }

    @PostMapping
    public Review create(@RequestBody CreateReviewRequest dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public Review update(@PathVariable Long id, @RequestBody UpdateReviewRequest dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @RequestParam String reason) {
        service.delete(id, reason);
    }
}
