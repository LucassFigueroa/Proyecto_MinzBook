package minzbookweb.authserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(
        description = "Datos necesarios para registrar un nuevo usuario en MinzBook."
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @Schema(
            description = "Nombre completo del usuario.",
            example = "Matías López"
    )
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Schema(
            description = "Correo electrónico del usuario. Se usará como dato de login.",
            example = "matias@example.com"
    )
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato válido")
    private String email;

    @Schema(
            description = "Contraseña elegida por el usuario. Debe tener al menos 6 caracteres.",
            example = "minzbook123"
    )
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
}
