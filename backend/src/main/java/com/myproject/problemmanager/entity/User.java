package com.myproject.problemmanager.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name",nullable = false)
    private String name;

    @Column(name="email",nullable = false,unique = true)
    private String email;

    @Column(name="username",nullable = false)
    private String username;

    @Column(name="password",nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,orphanRemoval = true)
//    @JsonManagedReference
    private List<LeetcodeProblem> problems;




}

//When you use JPA/Hibernate (via Spring Boot) without fully mirroring the constraints from MySQL in your entity:
//
//Spring thinks your request is valid and accepts the input.
//
//Hibernate prepares the SQL INSERT and logs it.
//
//But when it reaches MySQL, the DB says ❌:
//
//        "NULL value in a NOT NULL column"
//
//Or "Duplicate entry for UNIQUE column"
//
//And if you don’t flush or handle exceptions, you never see that error — Hibernate silently rolls back.
//
