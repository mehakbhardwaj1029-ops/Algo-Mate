package com.myproject.problemmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="teach")
public class ProblemTeaching {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "problem_id",nullable = false,unique = true,updatable = false)
    private String problemId = UUID.randomUUID().toString();

    @Column(name="problem_name")
    private String problemName;

    @Column(name="explanation")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String explanation;

    @Column(name="code")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String codeSnippet;

    @Column(name="uploaded_at")
    @CreationTimestamp
    private LocalDateTime uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

}
