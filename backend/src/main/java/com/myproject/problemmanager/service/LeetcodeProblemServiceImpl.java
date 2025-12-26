package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dao.LeetcodeProblemRepository;
import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.dto.LeetcodeProblemRequest;
import com.myproject.problemmanager.dto.LeetcodeProblemResponse;
import com.myproject.problemmanager.entity.LeetcodeProblem;
import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class LeetcodeProblemServiceImpl implements LeetCodeProblemService{

    private final LeetcodeProblemRepository problemRepository;
    private final UserRepository userRepository;
    private final AuthenticationFacade authenticationFacade;

    @Override
    @Transactional
    public LeetcodeProblemResponse addProblem(LeetcodeProblemRequest request) {
        //To catch rare cases like "user deleted after token issued". still accessing user
        try {
            String loggedInUserEmail = authenticationFacade.getLoggedInEmail();
            User loggedInUser = userRepository.findByEmail(loggedInUserEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            LeetcodeProblem newProblem = convertToEntity(request);
            newProblem.setUser(loggedInUser);

            LeetcodeProblem saved = problemRepository.save(newProblem);
            return convertToResponse(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add problem " + e);
        }
    }


    @Override
    public List<LeetcodeProblemResponse> getAllUserProblems() {
         String loggedInEmail = authenticationFacade.getLoggedInEmail();
         User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not found"));

         List<LeetcodeProblem> dbentries = problemRepository.findByUserId(loggedInUser.getId());
         return dbentries.stream().map(object->convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public LeetcodeProblemResponse getProblemById(String publicId) {
        LeetcodeProblem existingProblem = problemRepository.findByPublicId(publicId).orElseThrow(()->new RuntimeException("Problem Not Found "));
        return convertToResponse(existingProblem);
    }

//    Security best practice is: “Never trust the client to only send valid data.”
    @Override
    @Transactional
    public void deleteProblem(String publicId) {
        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException(" user not exist "));

        LeetcodeProblem problem = problemRepository.findByPublicId(publicId).orElseThrow(()->new RuntimeException("problem not found"));

        if(!problem.getUser().getId().equals(loggedInUser.getId())){
            throw new RuntimeException("unauthorized to delete this problem ");
        }

        problemRepository.deleteByPublicId(publicId);
    }

    @Override
    public List<LeetcodeProblemResponse> getProblemsByTopic(String topic) {
        String loggedInUserEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInUserEmail).orElseThrow(()->new RuntimeException("user not found"));
        return problemRepository.findProblemsByUserIdAndTopic(loggedInUser.getId(),topic)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public LeetcodeProblemResponse updateProblem(String publicId,LeetcodeProblemRequest request) {
        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not exist"));

        LeetcodeProblem existingProblem = problemRepository.findByPublicId(publicId).orElseThrow(()->new RuntimeException("problem not exist"));

        if(!existingProblem.getUser().getId().equals(loggedInUser.getId())){
            throw new RuntimeException("you are not authorized to update the problem");
        }

        if(request.getProblemName()!=null){
            existingProblem.setProblemName(request.getProblemName());
        }
        if(request.getLeetcodeLink()!=null){
            existingProblem.setLeetcodeLink(request.getLeetcodeLink());
        }
        if(request.getReferenceLink()!=null){
            existingProblem.setReferenceLink(request.getReferenceLink());
        }
        if(request.getTutorial()!=null){
            existingProblem.setTutorial(request.getTutorial());
        }

        LeetcodeProblem saved = problemRepository.save(existingProblem);
        return convertToResponse(saved);
    }

    @Override
    public String getNotes(String publicId) {
        String loggedInEmail = authenticationFacade.getLoggedInEmail();
        User loggedInUser = userRepository.findByEmail(loggedInEmail).orElseThrow(()->new RuntimeException("user not exist"));

        LeetcodeProblem existingProblem = problemRepository.findByPublicId(publicId).orElseThrow(()->new RuntimeException("problem not exist"));

        if(!existingProblem.getUser().getId().equals(loggedInUser.getId())){
            throw new RuntimeException("you are not authorized to access notes");
        }
        return existingProblem.getTutorial();
    }


    private LeetcodeProblem convertToEntity(LeetcodeProblemRequest request){
       return LeetcodeProblem.builder()
               .problemName(request.getProblemName())
               .leetcodeLink(request.getLeetcodeLink())
               .referenceLink(request.getReferenceLink())
               .tutorial(request.getTutorial())
               .topic(request.getTopic())
               .build();
}

private LeetcodeProblemResponse convertToResponse(LeetcodeProblem entity){
    return LeetcodeProblemResponse.builder()
            .publicId(entity.getPublicId())
            .problemName(entity.getProblemName())
            .leetcodeLink(entity.getLeetcodeLink())
            .referenceLink(entity.getReferenceLink())
            .tutorial(entity.getTutorial())
            .topic(entity.getTopic())
            .build();
}


}

//1. Why use the returned value from repo.save()?
//
//Even though newProblem is already an entity, when you call repo.save(newProblem):
//
//Hibernate/JPA assigns values that weren’t set yet.
//For example:
//
//The auto-generated primary key (id) gets populated only after save.
//
//Other default values (like timestamps, if you use them later) may also be set by DB.
//
//So if you immediately do:
//
//return convertToResponse(newProblem);
//
//
//You risk returning a response with id = 0 (or null) because it wasn’t refreshed with DB-generated values.
//
//2. Difference between newProblem and saved
//LeetcodeProblem saved = repo.save(newProblem);
//
//
//saved is a managed entity with all DB values set (including generated ID).
//
//newProblem is just the one you created from the DTO.
//
//Most of the time, Hibernate updates newProblem in place and they become the same Java object reference. But this is not guaranteed across providers or future changes. Using saved makes it explicit that you want the post-save state.
//
//3. Why convert to Response afterwards?
//
//Because your response DTO is what your API should expose. You don’t want to return the entity itself — it can leak internal details like user, lazy-loaded relations, etc. The conversion ensures:
//
//Only required fields are exposed.
//
//Naming/structure can differ (like renaming tutorial to notes in response).