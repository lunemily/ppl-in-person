interface leagueFormat {
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

export interface PPLSettings {
  showTrainerCard: boolean;
  howToChallenge: boolean;
  rules: boolean;
  prizePools: boolean;
  schedule: boolean;
  bingoBoard: boolean;
  eventIsOver: boolean;
  eventSupportsQueueState: boolean;
  leadersToDefeat: number;
  elitesToDefeat: number;
  map: boolean;
  leagueFormat: leagueFormat;
  meetupTimes: MeetupTime[];
}
