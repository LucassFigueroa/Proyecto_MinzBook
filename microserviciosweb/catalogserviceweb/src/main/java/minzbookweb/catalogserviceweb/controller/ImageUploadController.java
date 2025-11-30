package minzbookweb.catalogserviceweb.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

// Swagger
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(
        name = "Imágenes",
        description = "Endpoint para subir imágenes de portadas de libros al servidor."
)
public class ImageUploadController {

    private final String UPLOAD_DIR = "src/main/resources/static/images/";

    @Operation(
            summary = "Subir una imagen de portada",
            description = "Permite subir un archivo de imagen al servidor y devuelve la URL pública relativa para usarla en el frontend."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Imagen subida correctamente. Se devuelve la URL pública.",
                    content = @Content(
                            mediaType = "text/plain",
                            schema = @Schema(example = "/images/1701367890000_portada.jpg")
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "El archivo está vacío",
                    content = @Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno al subir la imagen",
                    content = @Content(mediaType = "text/plain")
            )
    })
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Archivo vacío");
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String publicUrl = "/images/" + filename;

            return ResponseEntity.ok(publicUrl);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir imagen: " + e.getMessage());
        }
    }
}
