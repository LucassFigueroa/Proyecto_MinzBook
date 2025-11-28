package minzbookweb.supportserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {
    private Long userId;
    private String subject;
    private String message;
}
