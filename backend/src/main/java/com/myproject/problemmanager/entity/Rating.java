package com.myproject.problemmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="rating",
uniqueConstraints = { @UniqueConstraint(columnNames = {"problem_id","rater" +
        "_id"})})
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id",nullable = false)
    private ProblemTeaching problem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id",nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User tutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rater_id",nullable = false)
    private User rater;

    @Column(nullable = false)
    private Integer ratingValue;




}
