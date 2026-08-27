package com.niteshgiri.AthleteArena.model;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "user_Profile")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfile {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Enter your name")
    private String name;

    private String bio;

    private String profileImageUrl;

    private String backgroundImageUrl;

    @Builder.Default
    private Set<String> followers = new HashSet<>();

    @Builder.Default
    private Set<String> following = new HashSet<>();

    @Builder.Default
    private Set<String> tags = new HashSet<>();

    @CreatedDate
    private Instant createdAt;
}