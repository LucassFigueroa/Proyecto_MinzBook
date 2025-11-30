package minzbookweb.authserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import minzbookweb.authserviceweb.model.Role;

@Schema(
        description = "Respuesta devuelta después de un login o registro exitoso. " +
                      "Incluye el token JWT y los datos básicos del usuario autenticado."
)
public class AuthResponse {

    @Schema(
            description = "Token JWT que debe ser enviado en el encabezado Authorization para futuras solicitudes.",
            example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    )
    private String token;

    @Schema(
            description = "Identificador único del usuario en el sistema.",
            example = "10"
    )
    private Long id;

    @Schema(
            description = "Nombre del usuario.",
            example = "Matías López"
    )
    private String name;

    @Schema(
            description = "Correo electrónico del usuario.",
            example = "matias@example.com"
    )
    private String email;

    @Schema(
            description = "Rol asignado al usuario dentro del sistema.",
            example = "USER"
    )
    private Role role;

    public AuthResponse(String token, Long id, String name, String email, Role role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}
