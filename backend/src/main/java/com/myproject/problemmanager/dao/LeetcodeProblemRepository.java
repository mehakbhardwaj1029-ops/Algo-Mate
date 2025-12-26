package com.myproject.problemmanager.dao;

import com.myproject.problemmanager.dto.LeetcodeProblemResponse;
import com.myproject.problemmanager.entity.LeetcodeProblem;
import com.myproject.problemmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeetcodeProblemRepository extends JpaRepository<LeetcodeProblem,Integer> {

    Optional<LeetcodeProblem> findByPublicId(String publicId);

    void deleteByPublicId(String publicId);

    List<LeetcodeProblem> findByUserId(Long id);

    List<LeetcodeProblem> findProblemsByUserIdAndTopic(Long userId ,String topic);

}
//The repository (LeetcodeProblemRepository) always works with entities (LeetcodeProblem), not DTOs like LeetcodeProblemResponse.