package minzbookweb.reviewserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Schema(description = "Representa una reseña registrada en el sistema.")
public class ReviewResponse {

    @Schema(description = "ID interno de la reseña.", example = "1")
    private Long id;

    @Schema(description = "Identificador del libro reseñado.", example = "9788408223148")
    private String bookId;

    @Schema(description = "ID del usuario que escribió la reseña.", example = "10")
    private Long userId;

    @Schema(description = "Puntuación otorgada al libro.", example = "5")
    private Integer rating;

    @Schema(description = "Comentario escrito por el usuario.", example = "Me encantó el libro.")
    private String comment;

    @Schema(description = "Indica si la reseña está activa (no eliminada lógicamente).", example = "true")
    private boolean active;

    @Schema(description = "Motivo de eliminación, en caso de que la reseña haya sido desactivada.", example = "Eliminada por el usuario")
    private String deletedReason;

    @Schema(description = "Fecha y hora en que se creó la reseña.", example = "2025-11-29T18:30:00")
    private LocalDateTime createdAt;
}
