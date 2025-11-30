package minzbookweb.authserviceweb.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "MinzBook - Auth Service API",
                version = "1.0",
                description = "Microservicio encargado del registro, login y autenticación JWT."
        ),
        servers = {
                @Server(
                        description = "Ambiente local",
                        url = "http://localhost:8086"
                )
        }
)
public class OpenApiConfig {
}
