package com.myproject.problemmanager.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {
    Authentication getAuthentication();
    String getLoggedInEmail();
}
