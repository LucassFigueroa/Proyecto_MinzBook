package minzbookweb.reviewserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateReviewRequest {
    private Integer rating;
    private String comment;
}
