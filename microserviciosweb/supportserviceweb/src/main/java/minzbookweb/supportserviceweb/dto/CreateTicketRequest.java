package minzbookweb.supportserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Datos necesarios para crear un ticket de soporte.")
public class CreateTicketRequest {

    @Schema(description = "ID del usuario que crea el ticket.", example = "12")
    private Long userId;

    @Schema(description = "Asunto principal del problema.", example = "No puedo iniciar sesión")
    private String subject;

    @Schema(description = "Mensaje detallando el problema.", example = "Intento iniciar sesión pero la app dice que mi token es inválido.")
    private String message;
}
