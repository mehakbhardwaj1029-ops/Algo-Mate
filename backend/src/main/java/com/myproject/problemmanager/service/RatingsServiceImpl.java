package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dao.RatingRepository;
import com.myproject.problemmanager.dao.TeachRepository;
import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.dto.RatingRequest;
import com.myproject.problemmanager.dto.RatingResponse;
import com.myproject.problemmanager.dto.RatingSummaryResponse;
import com.myproject.problemmanager.entity.ProblemTeaching;
import com.myproject.problemmanager.entity.Rating;
import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class RatingsServiceImpl implements RatingsService {

    private final AuthenticationFacade authenticationFacade;
    private final UserRepository userRepository;
    private final TeachRepository teachRepository;
    private final RatingRepository ratingRepository;

    @Override
    public Rating addRating(RatingRequest ratingRequest) {

        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User rater = userRepository.findByEmail(loggedInEmail)
                .orElseThrow(()->new RuntimeException("Rater not found"));

        ProblemTeaching problem = teachRepository.findByProblemId(ratingRequest.getProblemId()).orElseThrow(
                ()->new RuntimeException("Problem not found")
        );

        User tutor = problem.getUser();

        Rating rating = Rating.builder()
                .problem(problem)
                .tutor(tutor)
                .rater(rater)
                .ratingValue(ratingRequest.getRatingValue())
                .build();

        ratingRepository.save(rating);

        return rating;

    }

    @Override
    public List<RatingSummaryResponse> getAllTutorsRatingSummary() {
         return ratingRepository.getAllTutorsRatingSummary();
    }

    @Override
    public RatingSummaryResponse getRatings(String problemId) {

        ProblemTeaching problemTeaching = teachRepository.findByProblemId(problemId)
                .orElseThrow(()->new RuntimeException("problem not exist"));


        return ratingRepository.getRatingSummary(problemTeaching.getId());
    }


}
