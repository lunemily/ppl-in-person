import { Format } from './format';

/** This object represents queues for users. leaders will receive challengerIds and challengers will receive leaderIds */
export interface Queue {
  leaderId?: string;
  leaderName?: string;
  displayName?: string;
  badgeName?: string;
  challengerId?: string;
  position: number;
  badgeArt?: string;
  battleFormat?: Format;
  battleDifficulty?: Format;
  battleCode?: string;
  otherChallengerId?: string;
  isChampion?: boolean;
  // badgesEarned?: number;
}
