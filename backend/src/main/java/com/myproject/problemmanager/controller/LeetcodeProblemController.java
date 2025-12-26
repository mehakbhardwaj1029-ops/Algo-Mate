package com.myproject.problemmanager.controller;

import com.myproject.problemmanager.dto.LeetcodeProblemRequest;
import com.myproject.problemmanager.dto.LeetcodeProblemResponse;
import com.myproject.problemmanager.entity.LeetcodeProblem;
import com.myproject.problemmanager.entity.User;
import com.myproject.problemmanager.service.LeetCodeProblemService;
import com.myproject.problemmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/problem")
public class LeetcodeProblemController {

    private final LeetCodeProblemService problemService;

    public LeetcodeProblemController(LeetCodeProblemService problemService, UserService userService){
        this.problemService = problemService;
    }

    @GetMapping("/list")
    public List<LeetcodeProblemResponse> userProblemList(){
        return problemService.getAllUserProblems();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProblemForUser(@RequestBody LeetcodeProblemRequest request){


        LeetcodeProblemResponse savedProblem =  problemService.addProblem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProblem);
    }

    @PatchMapping("/update/{publicId}")
    public ResponseEntity<LeetcodeProblemResponse> updateProblem(@PathVariable String publicId,@RequestBody LeetcodeProblemRequest problem){
        LeetcodeProblemResponse updated = problemService.updateProblem(publicId,problem);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{publicId}")
    public ResponseEntity<?> deleteProblem(@PathVariable String publicId){

        problemService.deleteProblem(publicId);
        return ResponseEntity.ok("Problem deleted successfully");

    }

    @GetMapping("/by-topic")
    public ResponseEntity<List<LeetcodeProblemResponse>> getProblemsByTopic(@RequestParam String topic){
        return ResponseEntity.ok(problemService.getProblemsByTopic(topic));
    }

    @GetMapping("/notes/{publicId}")
    public String getNotesOfProblem(@PathVariable String publicId){
        return problemService.getNotes(publicId);
    }


}
//Rule of Thumb
//Use @PathVariable → When the parameter is a required part of the resource’s path (IDs, slugs, usernames).
//Use @RequestParam → When the parameter is optional or acts as a filter/search modifier.