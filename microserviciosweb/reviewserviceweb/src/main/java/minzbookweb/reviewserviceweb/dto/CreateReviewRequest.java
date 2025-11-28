package minzbookweb.reviewserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReviewRequest {
    private String bookId;
    private Long userId;
    private Integer rating;
    private String comment;
}
