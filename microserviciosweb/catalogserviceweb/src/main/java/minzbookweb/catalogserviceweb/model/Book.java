package minzbookweb.catalogserviceweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String isbn;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, length = 120)
    private String author;

    @Column(nullable = false, length = 120)
    private String genre;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String coverUrl;

    @Column(nullable = false, length = 3000)
    private String description;

    @Column(nullable = false)
    private Long postedByUserId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
