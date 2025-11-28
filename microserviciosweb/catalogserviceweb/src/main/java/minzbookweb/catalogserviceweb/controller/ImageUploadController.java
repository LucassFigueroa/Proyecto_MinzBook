package minzbookweb.catalogserviceweb.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageUploadController {

    private final String UPLOAD_DIR = "src/main/resources/static/images/";

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

            // URL pública para usarla en el front
            String publicUrl = "/images/" + filename;

            return ResponseEntity.ok(publicUrl);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir imagen: " + e.getMessage());
        }
    }
}
