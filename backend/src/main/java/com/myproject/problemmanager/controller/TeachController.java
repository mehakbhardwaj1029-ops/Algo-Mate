package com.myproject.problemmanager.controller;

import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.dto.ProblemTeachingRequest;
import com.myproject.problemmanager.dto.ProblemTeachingResponse;
import com.myproject.problemmanager.entity.ProblemTeaching;
import com.myproject.problemmanager.service.ProblemTeachingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/tutor/tutorial")
public class TeachController {

    private final ProblemTeachingService problemTeachingService;
    private final UserRepository userRepository;

    @PutMapping("/add")
    public ResponseEntity<ProblemTeachingResponse> addTutorial(@RequestBody ProblemTeachingRequest request){
        return ResponseEntity.ok(problemTeachingService.addProblem(request));
    }
    @PatchMapping("/update/{problemId}")
    public ResponseEntity<ProblemTeachingResponse> updateTutorial(@PathVariable String problemId, @RequestBody ProblemTeachingRequest request){
        return ResponseEntity.ok(problemTeachingService.updateProblem(problemId,request));
    }

    @GetMapping("/all")
    public List<ProblemTeachingResponse> allTutorials(){
        return problemTeachingService.getAllUserProblem();
    }

    //for allTutorials page
    @GetMapping("/all/tutorials")
    public List<ProblemTeachingResponse> getAllProblems(){
        return problemTeachingService.getAllProblems();
    }

    @GetMapping("/{username}/tutorials")
    public List<ProblemTeachingResponse> getTutorProblems(@PathVariable String username){
        return problemTeachingService.getAllTutorProblem(username);
    }

    @GetMapping("/{problemId}")
    public ProblemTeachingResponse getTutorialById(@PathVariable String problemId){
        return problemTeachingService.getTutorialById(problemId);
    }


    @DeleteMapping("/delete/{problemId}")
    public ResponseEntity<Void> deleteTutorial(@PathVariable String problemId){
        problemTeachingService.deleteProblem(problemId);
        return ResponseEntity.noContent().build();
    }
}
