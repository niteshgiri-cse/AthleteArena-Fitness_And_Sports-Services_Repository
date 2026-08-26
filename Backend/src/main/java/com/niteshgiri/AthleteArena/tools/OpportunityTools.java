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
        return opportunityService.searchOpportunities(sport, location);
    }
}