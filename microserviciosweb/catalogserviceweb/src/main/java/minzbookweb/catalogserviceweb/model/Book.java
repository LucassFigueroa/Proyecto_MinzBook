package minzbookweb.catalogserviceweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String isbn;

    private String title;

    private String author;

    private String genre;

    private Double price;


    private String coverUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Long postedByUserId;
}
