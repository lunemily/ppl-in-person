/** This object represents queues for users. leaders will receive challegnerIds and challengers will receive leaderIds */
export interface Queue {
  leaderId?: string;
  leaderName?: string;
  displayName?: string;
  challengerId?: string;
  position: number;
  }