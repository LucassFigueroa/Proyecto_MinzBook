package minzbookweb.supportserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStatusRequest {
    private String status;       // OPEN, IN_PROGRESS, RESOLVED, CLOSED
    private String reason;       // solo si se cierra o resuelve
}
