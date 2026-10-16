package com.niteshgiri.AthleteArena.controller;

import com.niteshgiri.AthleteArena.service.imp.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class AIController {

    private final ChatService chatService;

    @PostMapping(
            value = "/live",
            consumes = MediaType.TEXT_PLAIN_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    public ResponseEntity<String> chat(
            @RequestBody String message
    ) {
        return ResponseEntity.ok(
                chatService.chat(message)
        );
    }
}