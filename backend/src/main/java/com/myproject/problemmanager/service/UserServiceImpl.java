package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.dto.UserRequest;
import com.myproject.problemmanager.dto.UserResponse;
import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;



    @Override
    @Transactional
    public UserResponse register(UserRequest request) {
        User userEntity = convertToEntity(request);
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        userEntity = userRepository.save(userEntity);
        return convertToResponse(userEntity);

    }


    @Override
    public Long findByUserId(String email) {
        String loggedInUserEmail = authenticationFacade.getAuthentication().getName();
        User loggedInUser = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
        return loggedInUser.getId();
    }

private User convertToEntity(UserRequest request){
        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .username(request.getUsername())
                .build();
}

private UserResponse convertToResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
}


}
