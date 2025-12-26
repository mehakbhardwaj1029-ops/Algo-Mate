package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dto.UserRequest;
import com.myproject.problemmanager.dto.UserResponse;
import com.myproject.problemmanager.entity.User;

import java.util.List;

public interface UserService {


    UserResponse register(UserRequest request);


    Long findByUserId(String email);
}
