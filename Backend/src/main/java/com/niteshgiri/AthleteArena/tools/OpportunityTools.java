package com.niteshgiri.AthleteArena.tools;

import com.niteshgiri.AthleteArena.service.Interface.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpportunityTools {

    private final OpportunityService opportunityService;

    @Tool(description = """
            Search tournaments, trials, scouting opportunities and other
            opportunities available on Athlete Arena.
            Use this when the user asks about tournaments, trials,
            registrations, scouting or sports opportunities.
            """)
    public String searchOpportunities(
            String sport,
            String location
    ) {
        try {
            String result =
                    opportunityService.searchOpportunities(
                            sport,
                            location
                    );

            if (result == null || result.isBlank()) {
                return "No opportunities are currently available for the requested sport or location.";
            }

            return result;

        } catch (Exception e) {
            return "No opportunity data is currently available on Athlete Arena.";
        }
    }
}