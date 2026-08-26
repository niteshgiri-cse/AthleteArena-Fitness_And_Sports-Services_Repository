package com.niteshgiri.AthleteArena.tools;

import com.niteshgiri.AthleteArena.service.Interface.SportsContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SportsContentTools {

    private final SportsContentService sportsContentService;

    @Tool(description = """
            Search sports news and articles available on Athlete Arena.
            Use this when the user asks about sports news, articles,
            match-related articles or sports content available on the website.
            """)
    public String searchSportsContent(String sport) {
        return sportsContentService.searchSportsContent(sport);
    }
}
