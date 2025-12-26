package com.myproject.problemmanager.dto;

import com.myproject.problemmanager.entity.ProblemTeaching;
import com.myproject.problemmanager.entity.User;
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
public class RatingResponse {

    private String tutorUsername;

    private String problemId;

    private Long tutorId;

    private Long raterId;

    private Integer ratingValue;

}
