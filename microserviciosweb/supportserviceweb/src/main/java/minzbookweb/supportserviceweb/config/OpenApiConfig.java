package minzbookweb.supportserviceweb.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "MinzBook - Support Service API",
                version = "1.0",
                description = "Microservicio encargado de gestionar tickets de soporte para usuarios del sistema."
        ),
        servers = {
                @Server(
                        description = "Ambiente local",
                        url = "http://localhost:8089"
                )
        }
)
public class OpenApiConfig {
}
