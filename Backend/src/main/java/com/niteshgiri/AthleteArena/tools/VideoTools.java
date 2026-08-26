package com.niteshgiri.AthleteArena.tools;

import com.niteshgiri.AthleteArena.service.Interface.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VideoTools {

    private final VideoService videoService;

    @Tool(description = """
            Search videos available in the Athlete Arena video library.
            Use this when the user asks for training videos,
            technique videos, drills, match analysis, or tactical videos.
            """)
    public String searchVideos(
            String sport,
            String topic,
            String level
    ) {
        return videoService.searchVideos(sport, topic, level);
    }
}