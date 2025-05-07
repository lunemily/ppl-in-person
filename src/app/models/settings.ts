interface LeagueFormat {
  badgesForElites: number;
  badgesForChamp: number;
  emblemsForChamp: number;
  emblemWeight: number;
}

export interface MeetupTime {
  location: string;
  startTime: number; // millis
  duration: number; // Minutes
  endTime: number; // millis
}

interface Assets {
  howToChallenge?: string;
  rules?: string;
  prizePools?: string;
  schedule?: string;
  map?: string;
  sideActivities?: string;
}

export interface PPLSettings {
  leaderFeedbackSurveyUrl: string;
  challengerFeedbackSurveyUrl: string;
  showSurveyBanner: boolean;
  showTrainerCard: boolean;
  bingoBoard: boolean;
  eventIsOver: boolean;
  eventSupportsQueueState: boolean;
  leadersToDefeat: number;
  elitesToDefeat: number;
  leagueFormat: LeagueFormat;
  meetupTimes: MeetupTime[];
  assets: Assets;
  champHasBadge: boolean
}
