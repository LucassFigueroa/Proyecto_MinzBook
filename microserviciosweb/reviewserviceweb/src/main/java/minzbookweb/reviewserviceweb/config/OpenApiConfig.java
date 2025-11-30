package minzbookweb.reviewserviceweb.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "MinzBook - Review Service API",
                version = "1.0",
                description = "Microservicio encargado de gestionar reseñas de libros (crear, actualizar, desactivar y consultar por libro)."
        ),
        servers = {
                @Server(
                        description = "Ambiente local",
                        url = "http://localhost:8088"
                )
        }
)
public class OpenApiConfig {
}
