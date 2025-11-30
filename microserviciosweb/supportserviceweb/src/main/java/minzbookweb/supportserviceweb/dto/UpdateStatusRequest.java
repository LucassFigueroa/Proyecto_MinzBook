package minzbookweb.supportserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Datos para actualizar el estado de un ticket de soporte.")
public class UpdateStatusRequest {

    @Schema(
            description = "Nuevo estado del ticket.",
            example = "RESOLVED",
            allowableValues = {"OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"}
    )
    private String status;

    @Schema(
            description = "Motivo cuando el ticket es resuelto/cerrado.",
            example = "Se reinició el servicio de autenticación."
    )
    private String reason;
}
