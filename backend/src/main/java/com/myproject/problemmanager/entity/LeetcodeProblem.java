package com.myproject.problemmanager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="problems")
public class LeetcodeProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="public_id",unique = true,nullable = false,updatable = false)
    private String publicId;

    @Column(name="problem_name")
    private String problemName;

    @Column(name="leetcode")
    private String leetcodeLink;

    @Column(name="reference")
    private String referenceLink;

    @Column(name="tutorial")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String tutorial;

    @Column(name="topic", nullable = false)
    private String topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")    //user_id is the foreign key
//    @JsonBackReference
    @JsonIgnore
    private User user;

//    public LeetcodeProblem(){}
//
//    public LeetcodeProblem(String problemName, String leetcodeLink, String referenceLink, String tutorial) {
//        this.problemName = problemName;
//        this.leetcodeLink = leetcodeLink;
//        this.referenceLink = referenceLink;
//        this.tutorial = tutorial;
//    }

    @PrePersist
    public void generatePublicId(){
        if(this.publicId==null){
            this.publicId = UUID.randomUUID().toString();
        }
    }


}

















//The annotation @Column(columnDefinition = "TEXT") in your JPA entity tells Hibernate (the ORM for Spring Boot) to generate the underlying SQL table column with the MySQL TEXT data type for that property.
//
//What does columnDefinition = "TEXT" mean?
//It instructs Hibernate to create this specific column as a TEXT column in your database, rather than the default type for a String (which might be VARCHAR of a default length).
//
//Use it when your text might be very long and you need to allow more than what a standard VARCHAR provides.
//
//What is MySQL TEXT datatype?
//The TEXT datatype in MySQL is designed to store long-form character strings—much longer than VARCHAR's usual limits.
//
//A normal TEXT field can hold up to 65,535 bytes (approx 64 KB) of text, which fits most "notes", comments, and descriptions.
//
//        Unlike VARCHAR, the storage for TEXT columns is not strictly limited by the row size and is often stored separately from the main table row.
//
//Why is it used for "notes"?
//notes fields can vary greatly in length and may contain a lot of written information.
//
//Using TEXT ensures you are not artificially limiting how much a user can write in their notes and avoids row size limit issues of VARCHAR.