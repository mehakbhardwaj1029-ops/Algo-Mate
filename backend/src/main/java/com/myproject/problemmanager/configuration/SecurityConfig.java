package com.myproject.problemmanager.configuration;

import com.myproject.problemmanager.Filter.JwtAuthenticationFilter;
import com.myproject.problemmanager.service.AppUserDetailService;
import com.myproject.problemmanager.service.AuthenticationFacade;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

         private final AppUserDetailService appUserDetailService;
         private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(AppUserDetailService appUserDetailService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.appUserDetailService = appUserDetailService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
         public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
             http
                     .cors(Customizer.withDefaults()) //by default use a bena of corsconfigurationsource
                     .csrf(AbstractHttpConfigurer::disable)
                     .authorizeHttpRequests(auth->auth.
                                     requestMatchers("/api/v1/login","/api/v1/register","/").permitAll()

                                    .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()

                                    .requestMatchers(HttpMethod.GET , "/api/v1/rating/**").permitAll()

                                    .requestMatchers(HttpMethod.GET , "/api/v1/tutor/tutorial/all/tutorials").permitAll()

                                    .requestMatchers(HttpMethod.GET,"/api/v1/tutor/tutorial/{username}/tutorials").permitAll()

                                    .requestMatchers(HttpMethod.GET , "/api/v1/tutor/tutorial/{problemId}").permitAll()


                                    .anyRequest().authenticated()
                     )

                     .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                     .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
             return http.build();

         }

         @Bean
         public PasswordEncoder passwordEncoder(){
             return new BCryptPasswordEncoder();
         }

//         @Bean
//         public CorsFilter corsFilter(){
//             return new CorsFilter(corsConfigurationSource());
//         }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET","PUT","POST","PATCH","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",config);
        return source;
    }
    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(appUserDetailService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }

}
 