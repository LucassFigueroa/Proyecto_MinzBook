package minzbookweb.catalogserviceweb.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "MinzBook - Catalog Service API",
                version = "1.0",
                description = "Microservicio encargado de gestionar el catálogo de libros (CRUD, búsqueda, filtros por género y autor)."
        ),
        servers = {
                @Server(
                        description = "Ambiente local",
                        url = "http://localhost:8087"
                )
        }
)
public class OpenApiConfig {
}
