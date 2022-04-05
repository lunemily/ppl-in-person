/** This object represents queues for users. leaders will receive challengerIds and challengers will receive leaderIds */
export interface Queue {
  leaderId?: string;
  leaderName?: string;
  displayName?: string;
  badgeName?: string;
  challengerId?: string;
  position: number;
}