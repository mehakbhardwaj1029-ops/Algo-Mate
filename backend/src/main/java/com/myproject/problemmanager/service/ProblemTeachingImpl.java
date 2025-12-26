package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dao.TeachRepository;
import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.dto.ProblemTeachingRequest;
import com.myproject.problemmanager.dto.ProblemTeachingResponse;
import com.myproject.problemmanager.entity.ProblemTeaching;
import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProblemTeachingImpl implements ProblemTeachingService{

    private final UserRepository userRepository;
    private final AuthenticationFacade authenticationFacade;
    private final TeachRepository teachRepository;

    @Override
    public ProblemTeachingResponse addProblem(ProblemTeachingRequest request) {
        try {
            String loggedInEmail = authenticationFacade.getLoggedInEmail();
            User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not exist"));

            ProblemTeaching newProblem = convertToEntity(request);

            newProblem.setUser(loggedInUser);

            if(request.getProblemName()==null || request.getProblemName().isBlank()){
                throw new RuntimeException("problem name is required");
            }
            newProblem.setProblemName(request.getProblemName());
            ProblemTeaching saved = teachRepository.save(newProblem);

            return convertToResponse(saved);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("problem could'nt be added");
        }
    }
    @Override
    public ProblemTeachingResponse updateProblem(String problemId, ProblemTeachingRequest request) {
        try {
            String loggedInEmail = authenticationFacade.getLoggedInEmail();
            User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not exist"));

            ProblemTeaching existingProblem = teachRepository.findByProblemId(problemId).orElseThrow(()->new RuntimeException("problem not user"));

            if(request.getProblemName()!=null){
                existingProblem.setProblemName(request.getProblemName());
            }

            if(request.getExplanation()!=null){
                existingProblem.setExplanation(request.getExplanation());
            }
            if(request.getCodeSnippet()!=null){
                existingProblem.setCodeSnippet(request.getCodeSnippet());
            }

            ProblemTeaching saved = teachRepository.save(existingProblem);

            return convertToResponse(saved);
        }catch (Exception e){
            throw new RuntimeException("problem could'nt be saved");
        }
    }

    //for user to see his problems
    @Override
    public List<ProblemTeachingResponse> getAllUserProblem() {

        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("User not exist"));

        List<ProblemTeaching> dbEntries = teachRepository.findByUserId(loggedInUser.getId());
        return dbEntries.stream().map(object->convertToResponse(object)).toList();
    }

    @Override
    public List<ProblemTeachingResponse> getAllTutorProblem(String username) {
        User tutor = userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("tutor not found"));
        List<ProblemTeaching> dbEntries = teachRepository.findByUserId(tutor.getId());
        return dbEntries.stream().map(object->convertToResponse(object)).toList();
    }

    @Override
    public ProblemTeachingResponse getTutorialById(String problemId) {

        ProblemTeaching problem = teachRepository.findByProblemId(problemId).orElseThrow(()->new RuntimeException("problem not present"));
        ProblemTeachingResponse response = convertToResponse(problem);
        return response;
    }

    //to delete a problem
    @Override
    @Transactional
    public void deleteProblem(String problemId) {
        teachRepository.deleteByProblemId(problemId);
    }

    //for everyone to see user problem



    //for search bar
    @Override
    public List<ProblemTeachingResponse> findAllByName(String name) {
        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not found"));

        List<ProblemTeaching> dbEntries = teachRepository.findAllByProblemName(name);
        return dbEntries.stream().map((object->convertToResponse(object))).toList();
    }



    @Override
        public List<ProblemTeachingResponse> findAllByNameForUser(String name) {
            String loggedInEmail = authenticationFacade.getLoggedInEmail();
            User loggedInUser = userRepository.findByEmail(loggedInEmail)
                    .orElseThrow(() -> new RuntimeException("user not found"));

            List<ProblemTeaching> dbEntries = teachRepository.findAllByProblemNameAndUserId(name, loggedInUser.getId());
            return dbEntries.stream().map(this::convertToResponse).toList();
    }

    //for eveyrone to see all problem
    @Override
    public List<ProblemTeachingResponse> getAllProblems() {
        List<ProblemTeaching> problemTeachings = teachRepository.findAll();

        return problemTeachings.stream().map(this::convertToResponse).toList();
    }




    private ProblemTeaching convertToEntity(ProblemTeachingRequest request){
        return ProblemTeaching.builder()
                .problemName(request.getProblemName())
                .explanation(request.getExplanation())
                .codeSnippet(request.getCodeSnippet())
                .build();
    }

    private ProblemTeachingResponse convertToResponse(ProblemTeaching entity){
        return ProblemTeachingResponse.builder()
                .problemId(entity.getProblemId())
                .problemName(entity.getProblemName())
                .explanation(entity.getExplanation())
                .codeSnippet(entity.getCodeSnippet())
                .uploadedAt(entity.getUploadedAt())
                .tutorUsername(entity.getUser().getUsername())
                .build();
    }
}
