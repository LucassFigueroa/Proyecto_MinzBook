package minzbookweb.catalogserviceweb.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(
        description = "Datos necesarios para crear o actualizar un libro en el catálogo."
)
public class BookRequest {

    @Schema(description = "Código ISBN del libro.", example = "9788408223148")
    private String isbn;

    @Schema(description = "Título del libro.", example = "El nombre del viento")
    private String title;

    @Schema(description = "Autor principal del libro.", example = "Patrick Rothfuss")
    private String author;

    @Schema(description = "Género literario del libro.", example = "Fantasía")
    private String genre;

    @Schema(description = "Precio de venta del libro.", example = "15990")
    private Double price;

    @Schema(description = "URL de la imagen de la portada.", example = "https://cdn.minzbook.com/covers/nombre-del-viento.jpg")
    private String coverUrl;

    @Schema(description = "Descripción o sinopsis del libro.", example = "Primera parte de la Crónica del Asesino de Reyes.")
    private String description;

    @Schema(description = "ID del usuario que publica el libro en el catálogo.", example = "10")
    private Long postedByUserId;
}
