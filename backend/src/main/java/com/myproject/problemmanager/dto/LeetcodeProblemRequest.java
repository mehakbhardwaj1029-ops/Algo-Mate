package com.myproject.problemmanager.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeetcodeProblemRequest {

    private String problemName;

    private String leetcodeLink;

    private String referenceLink;

    private String tutorial;

    private String topic;

}
