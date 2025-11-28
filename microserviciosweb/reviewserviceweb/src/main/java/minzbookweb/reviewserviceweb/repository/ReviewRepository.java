package minzbookweb.reviewserviceweb.repository;

import minzbookweb.reviewserviceweb.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByBookIdAndActiveTrue(String bookId);

    List<Review> findByUserIdAndActiveTrue(Long userId);
}
