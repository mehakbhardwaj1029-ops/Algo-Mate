package com.myproject.problemmanager.service;

import com.myproject.problemmanager.dao.UserRepository;
import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("user not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.emptyList());
    }
}

//1. Implements UserDetailsService
//
//Spring Security requires a UserDetailsService to fetch user information during authentication.
//
//Whenever someone tries to log in (via form login, basic auth, JWT filter, etc.), Spring Security calls this method with the username (or email in your case).
//
//2. loadUserByUsername(String email)
//
//Spring Security passes the username (or here, email) that the client entered.
//
//Your job: look up this user in the database and return a UserDetails object that Spring Security can use.
//
//3. userRepository.findByEmail(email)
//
//Calls your UserRepository (probably extends JpaRepository<User, Long>).
//
//Tries to find the user with the given email.
//
//.orElseThrow(...) → if no user found, throws UsernameNotFoundException.
//
//Spring Security expects this exception when login fails.
//
//4. return new org.springframework.security.core.userdetails.User(...)
//
//Spring provides a built-in User class that implements UserDetails.
//
//You return this so Spring Security can know:
//
//The username (user.getEmail())
//
//The password (user.getPassword()) → used for authentication checks
//
//The authorities/roles (here Collections.emptyList() = no roles)
//
//So you’re basically converting your custom User entity from the database into a Spring Security UserDetails object.
//
//5. Why is this necessary?
//
//Spring Security doesn’t know about your database or User entity.
//It only knows how to work with UserDetails.
//This method acts as a bridge:
//
//Database user → Spring Security UserDetails.
//
//✅ In Plain English
//
//When someone tries to log in:
//
//Spring Security calls loadUserByUsername(email).
//
//You fetch the user from DB.
//
//If not found → throw exception (login fails).
//
//If found → return a Spring Security user object with email, password, and authorities.
//
//Spring Security then compares the password and checks roles/authorities.
//
//Example Flow:
//
//Client sends { email: "abc@gmail.com", password: "1234" }.
//
//Spring calls loadUserByUsername("abc@gmail.com").
//
//You load the DB user → "abc@gmail.com" / "$2a$10$..." (BCrypt hash).
//
//Spring Security compares given password (1234) with stored hash.
//
//If match → authentication success, else → failure.