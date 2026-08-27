package com.niteshgiri.AthleteArena.service.Interface;

public interface AthleteService {
    String getPerformance(String athleteId);

    String getTrainingProgress(String athleteId);

    String getAthleteProfile(String athleteId);
}
