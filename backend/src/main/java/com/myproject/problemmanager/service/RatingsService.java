package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dto.RatingRequest;
import com.myproject.problemmanager.dto.RatingSummaryResponse;
import com.myproject.problemmanager.entity.Rating;

import java.util.List;
import java.util.UUID;

public interface RatingsService {

    public RatingSummaryResponse getRatings(String problemId);

    public Rating addRating(RatingRequest ratingRequest);

    List<RatingSummaryResponse> getAllTutorsRatingSummary();
}
