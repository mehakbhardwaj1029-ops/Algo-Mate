package com.myproject.problemmanager.controller;

import com.myproject.problemmanager.dto.RatingRequest;
import com.myproject.problemmanager.dto.RatingSummaryResponse;
import com.myproject.problemmanager.entity.Rating;
import com.myproject.problemmanager.service.RatingsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {

    private RatingsService ratingsService;
    @PostMapping("/add")
    public Rating addRating(@RequestBody RatingRequest ratingRequest){
        return ratingsService.addRating(ratingRequest);
    }

    @GetMapping("/problem/{problemId}")
    public RatingSummaryResponse getRating(@PathVariable String problemId){
        return ratingsService.getRatings(problemId);
    }

    @GetMapping("summary/all")
    public List<RatingSummaryResponse> getAllRatingsSummary(){
        return ratingsService.getAllTutorsRatingSummary();
    }
}
