package minzbookweb.reviewserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponse {
    private Long id;
    private String bookId;
    private Long userId;
    private Integer rating;
    private String comment;
    private boolean active;
    private String deletedReason;
    private LocalDateTime createdAt;
}
