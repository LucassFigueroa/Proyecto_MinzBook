package minzbookweb.supportserviceweb.controller;

import minzbookweb.supportserviceweb.dto.CreateTicketRequest;
import minzbookweb.supportserviceweb.dto.UpdateStatusRequest;
import minzbookweb.supportserviceweb.model.SupportTicket;
import minzbookweb.supportserviceweb.service.SupportTicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class SupportTicketController {

    private final SupportTicketService service;

    public SupportTicketController(SupportTicketService service) {
        this.service = service;
    }

    @PostMapping
    public SupportTicket create(@RequestBody CreateTicketRequest dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<SupportTicket> all() {
        return service.all();
    }

    @GetMapping("/user/{userId}")
    public List<SupportTicket> byUser(@PathVariable Long userId) {
        return service.byUser(userId);
    }

    @GetMapping("/{id}")
    public SupportTicket get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}/status")
    public SupportTicket updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest dto) {
        return service.updateStatus(id, dto);
    }
}
