package minzbookweb.supportserviceweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "support_tickets")
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;             // quien crea el ticket
    private String subject;          // título del problema

    @Column(length = 3000)
    private String message;          // descripción del problema

    @Enumerated(EnumType.STRING)
    private TicketStatus status;     // estado actual

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private LocalDateTime resolvedAt;

    private String closingReason;    // motivo si se cierra

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        status = TicketStatus.OPEN;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
