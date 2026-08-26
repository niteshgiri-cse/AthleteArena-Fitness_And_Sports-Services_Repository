package com.niteshgiri.AthleteArena.tools;

import com.niteshgiri.AthleteArena.service.Interface.AthleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AthleteTools {

    private final AthleteService athleteService;

    @Tool(description = """
            Get the current athlete profile and dashboard information.
            Use this when the user asks about their Athlete Arena profile,
            dashboard, current level, sport, or profile information.
            """)
    public String getAthleteProfile(String athleteId) {
        return athleteService.getAthleteProfile(athleteId);
    }

    @Tool(description = """
            Get the athlete's training progress.
            Use this when the user asks about completed training,
            progress, modules completed, or training consistency.
            """)
    public String getTrainingProgress(String athleteId) {
        return athleteService.getTrainingProgress(athleteId);
    }

    @Tool(description = """
            Get the athlete's performance statistics available in
            Athlete Arena.
            Use this when the user asks about their match performance,
            scores, accuracy, speed, stamina, or performance history.
            """)
    public String getPerformance(String athleteId) {
        return athleteService.getPerformance(athleteId);
    }
}