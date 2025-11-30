package minzbookweb.reviewserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Datos que pueden modificarse en una reseña existente.")
public class UpdateReviewRequest {

    @Schema(
            description = "Nueva puntuación de la reseña.",
            example = "4"
    )
    private Integer rating;

    @Schema(
            description = "Nuevo comentario de la reseña.",
            example = "Después de releerlo, me gustó un poco menos, pero sigue siendo muy bueno."
    )
    private String comment;
}
