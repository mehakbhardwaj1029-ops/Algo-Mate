package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dto.LeetcodeProblemRequest;
import com.myproject.problemmanager.dto.LeetcodeProblemResponse;
import com.myproject.problemmanager.entity.LeetcodeProblem;

import java.util.List;
import java.util.Optional;

public interface LeetCodeProblemService {

    LeetcodeProblemResponse addProblem(LeetcodeProblemRequest request);

    List<LeetcodeProblemResponse> getAllUserProblems();

    LeetcodeProblemResponse getProblemById(String publicid);

    void deleteProblem(String publicid);

    List<LeetcodeProblemResponse> getProblemsByTopic(String topic);

    LeetcodeProblemResponse updateProblem(String publicId, LeetcodeProblemRequest request);

    String getNotes(String publicId);
}
