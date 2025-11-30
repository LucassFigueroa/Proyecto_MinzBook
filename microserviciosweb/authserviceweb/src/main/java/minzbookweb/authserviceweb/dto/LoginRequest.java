package minzbookweb.authserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(
        description = "Datos necesarios para realizar el inicio de sesión de un usuario en MinzBook."
)
public class LoginRequest {

    @Schema(
            description = "Correo electrónico con el que el usuario se registró.",
            example = "matias@example.com"
    )
    @NotBlank
    @Email
    private String email;

    @Schema(
            description = "Contraseña del usuario.",
            example = "minzbook123"
    )
    @NotBlank
    private String password;

    public LoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
