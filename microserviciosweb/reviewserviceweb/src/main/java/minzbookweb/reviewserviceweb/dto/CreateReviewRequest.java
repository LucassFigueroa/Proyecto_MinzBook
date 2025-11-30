package minzbookweb.reviewserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Datos necesarios para crear una nueva reseña de un libro.")
public class CreateReviewRequest {

    @Schema(
            description = "Identificador del libro al que pertenece la reseña. Usamos el mismo ID/ISBN que maneja el catálogo.",
            example = "9788408223148"
    )
    private String bookId;

    @Schema(
            description = "ID del usuario que escribe la reseña.",
            example = "10"
    )
    private Long userId;

    @Schema(
            description = "Puntuación otorgada al libro, normalmente entre 1 y 5.",
            example = "5"
    )
    private Integer rating;

    @Schema(
            description = "Comentario de la reseña.",
            example = "Me encantó el libro, la historia es muy inmersiva."
    )
    private String comment;
}
