package com.myproject.problemmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingSummaryResponse {

    private String tutorUsername;
    private Long tutorId;
    private String problemId;
    private long totalRaters;
    private double averageRatings;
    private long totalPoints;

    public RatingSummaryResponse(
            String tutorUsername,
            Long tutorId,
            String problemId,
            Long totalRaters,
            double averageRatings,
            Long totalPoints
    ) {
        this.tutorUsername = tutorUsername;
        this.tutorId = tutorId;
        this.problemId = problemId;
        this.totalRaters = totalRaters;
        this.averageRatings = averageRatings;
        this.totalPoints = totalPoints;
    }
}
