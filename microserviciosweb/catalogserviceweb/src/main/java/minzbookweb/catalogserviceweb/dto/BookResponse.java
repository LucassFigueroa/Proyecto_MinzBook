package minzbookweb.catalogserviceweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponse {
    private Long id;
    private String isbn;
    private String title;
    private String author;
    private String genre;
    private Double price;
    private String coverUrl;
    private String description;
}
