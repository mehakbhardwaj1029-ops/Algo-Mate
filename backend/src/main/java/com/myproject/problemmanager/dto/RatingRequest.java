package com.myproject.problemmanager.dto;

import com.myproject.problemmanager.entity.ProblemTeaching;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingRequest {


    private String problemId;

    private Integer ratingValue;
}
