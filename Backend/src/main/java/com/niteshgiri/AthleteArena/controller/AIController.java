package com.niteshgiri.AthleteArena.controller;

import com.niteshgiri.AthleteArena.service.imp.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class AIController {

    private final ChatService chatService;


    @PostMapping
    public ResponseEntity<String> chat(@RequestHeader("Conversation-Id") String conversationId , @RequestBody String message){
        return ResponseEntity.ok(chatService.chat(message,conversationId));
    }


}
