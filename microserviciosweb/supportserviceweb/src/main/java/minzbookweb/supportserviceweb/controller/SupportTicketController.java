package minzbookweb.supportserviceweb.controller;

import minzbookweb.supportserviceweb.dto.CreateTicketRequest;
import minzbookweb.supportserviceweb.dto.UpdateStatusRequest;
import minzbookweb.supportserviceweb.model.SupportTicket;
import minzbookweb.supportserviceweb.service.SupportTicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Swagger
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(
        name = "Soporte",
        description = "Endpoints para la gestión de tickets de soporte de usuarios."
)
public class SupportTicketController {

    private final SupportTicketService service;

    public SupportTicketController(SupportTicketService service) {
        this.service = service;
    }

    @Operation(
            summary = "Crear un ticket de soporte",
            description = "Permite que un usuario envíe un ticket con un problema o solicitud."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Ticket creado correctamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SupportTicket.class)
                    )
            )
    })
    @PostMapping
    public SupportTicket create(@RequestBody CreateTicketRequest dto) {
        return service.create(dto);
    }

    @Operation(
            summary = "Listar todos los tickets",
            description = "Solo para administración. Muestra todos los tickets creados."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de tickets",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SupportTicket.class))
                    )
            )
    })
    @GetMapping
    public List<SupportTicket> all() {
        return service.all();
    }

    @Operation(
            summary = "Obtener tickets por usuario",
            description = "Listado de tickets enviados por un usuario específico."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Tickets encontrados",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SupportTicket.class))
                    )
            )
    })
    @GetMapping("/user/{userId}")
    public List<SupportTicket> byUser(@PathVariable Long userId) {
        return service.byUser(userId);
    }

    @Operation(
            summary = "Obtener un ticket específico",
            description = "Muestra el detalle de un ticket a partir de su ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Ticket encontrado",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SupportTicket.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ticket no encontrado"
            )
    })
    @GetMapping("/{id}")
    public SupportTicket get(@PathVariable Long id) {
        return service.get(id);
    }

    @Operation(
            summary = "Actualizar estado",
            description = "Permite cambiar el estado del ticket: OPEN, IN_PROGRESS, RESOLVED o CLOSED."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Estado actualizado",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SupportTicket.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ticket no encontrado"
            )
    })
    @PutMapping("/{id}/status")
    public SupportTicket updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest dto) {
        return service.updateStatus(id, dto);
    }
}
