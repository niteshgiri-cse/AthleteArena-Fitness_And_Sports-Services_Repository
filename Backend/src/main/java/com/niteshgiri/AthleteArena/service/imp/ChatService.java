package com.niteshgiri.AthleteArena.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatClient chatClient;

    public String chat(String query) {

        try {
            return chatClient
                    .prompt()
                    .user(query)
                    .call()
                    .content();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Gemini API failed: " + e.getMessage(), e);
        }
    }
}