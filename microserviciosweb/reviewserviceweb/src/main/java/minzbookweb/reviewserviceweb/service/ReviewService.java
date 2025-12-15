package minzbookweb.reviewserviceweb.service;

import minzbookweb.reviewserviceweb.dto.CreateReviewRequest;
import minzbookweb.reviewserviceweb.dto.UpdateReviewRequest;
import minzbookweb.reviewserviceweb.model.Review;
import minzbookweb.reviewserviceweb.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public Review create(CreateReviewRequest dto) {
        Review r = new Review();
        r.setBookId(dto.getBookId());
        r.setUserId(dto.getUserId());
        r.setRating(dto.getRating());
        r.setComment(dto.getComment());
        return repo.save(r);
    }

    public Review update(Long id, UpdateReviewRequest dto) {
        Review r = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Review no encontrada"));

        r.setRating(dto.getRating());
        r.setComment(dto.getComment());
        return repo.save(r);
    }

    public void delete(Long id, String reason) {
        Review r = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Review no encontrada"));

        r.setActive(false);
        r.setDeletedReason(reason);
        repo.save(r);
    }

    public List<Review> byBook(String isbn) {
        return repo.findByBookIdAndActiveTrue(isbn);
    }

    public List<Review> byUser(Long userId) {
        return repo.findByUserIdAndActiveTrue(userId);
    }

    public List<Review> findAll() {
        return repo.findAll();
    }
    
}
