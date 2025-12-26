package com.myproject.problemmanager.dao;

import com.myproject.problemmanager.dto.RatingSummaryResponse;
import com.myproject.problemmanager.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {

    @Query("""
SELECT new com.myproject.problemmanager.dto.RatingSummaryResponse(
    r.tutor.username, 
    r.tutor.id, 
    r.problem.problemId, 
    COUNT(r), 
    AVG(r.ratingValue), 
    SUM(r.ratingValue)
)
FROM Rating r 
WHERE r.problem.id = :problemId 
GROUP BY r.tutor.username, r.tutor.id, r.problem.problemId
""")
    RatingSummaryResponse getRatingSummary(@Param("problemId") Long problemId);

    @Query("SELECT new com.myproject.problemmanager.dto.RatingSummaryResponse(" +
            "r.tutor.username, r.tutor.id, NULL, COUNT(r), AVG(r.ratingValue), SUM(r.ratingValue)) " +
            "FROM Rating r " +
            "GROUP BY r.tutor.username, r.tutor.id " +
            "ORDER BY AVG(r.ratingValue) DESC")
    List<RatingSummaryResponse> getAllTutorsRatingSummary();


}
