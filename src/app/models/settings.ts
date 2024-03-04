interface leagueFormat {
  badgesForElites: number;
  badgesForChamp: number;
  emblemsForChamp: number;
  emblemWeight: number;
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
}
