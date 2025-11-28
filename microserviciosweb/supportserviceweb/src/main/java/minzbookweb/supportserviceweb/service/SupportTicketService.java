package minzbookweb.supportserviceweb.service;

import minzbookweb.supportserviceweb.dto.CreateTicketRequest;
import minzbookweb.supportserviceweb.dto.UpdateStatusRequest;
import minzbookweb.supportserviceweb.model.SupportTicket;
import minzbookweb.supportserviceweb.model.TicketStatus;
import minzbookweb.supportserviceweb.repository.SupportTicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SupportTicketService {

    private final SupportTicketRepository repo;

    public SupportTicketService(SupportTicketRepository repo) {
        this.repo = repo;
    }

    public SupportTicket create(CreateTicketRequest dto) {
        SupportTicket t = new SupportTicket();
        t.setUserId(dto.getUserId());
        t.setSubject(dto.getSubject());
        t.setMessage(dto.getMessage());
        return repo.save(t);
    }

    public List<SupportTicket> all() {
        return repo.findAll();
    }

    public List<SupportTicket> byUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public SupportTicket get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
    }

    public SupportTicket updateStatus(Long id, UpdateStatusRequest dto) {
        SupportTicket t = get(id);

        TicketStatus newStatus = TicketStatus.valueOf(dto.getStatus());
        t.setStatus(newStatus);

        if (newStatus == TicketStatus.RESOLVED || newStatus == TicketStatus.CLOSED) {
            t.setClosingReason(dto.getReason());
            t.setResolvedAt(LocalDateTime.now());
        }

        return repo.save(t);
    }
}
