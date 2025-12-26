package com.myproject.problemmanager.service;


import com.myproject.problemmanager.dto.ProblemTeachingRequest;
import com.myproject.problemmanager.dto.ProblemTeachingResponse;
import com.myproject.problemmanager.entity.ProblemTeaching;

import java.util.List;
import java.util.Optional;

public interface ProblemTeachingService {

    ProblemTeachingResponse addProblem(ProblemTeachingRequest request);

    ProblemTeachingResponse updateProblem(String problemId,ProblemTeachingRequest request);


    List<ProblemTeachingResponse> getAllUserProblem();

    //for leaderboard
    List<ProblemTeachingResponse> getAllTutorProblem(String username);


    ProblemTeachingResponse getTutorialById(String problemId);

    List<ProblemTeachingResponse> findAllByName(String name);


    void  deleteProblem(String problemId);

    public List<ProblemTeachingResponse> findAllByNameForUser(String name);

    List<ProblemTeachingResponse> getAllProblems();

}
