package com.myproject.problemmanager.dto;

import com.myproject.problemmanager.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProblemTeachingRequest {


    private String problemName;

    private String explanation;

    private String codeSnippet;

}
