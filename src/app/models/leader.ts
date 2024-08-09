import { Hold } from './hold';
import { Queue } from './queue';
import { Person } from './person';
import { Format } from './format';
import { leaderTypesMap } from '../constants.data';

/** This object represents a leader */
export interface Leader extends Person {
  leaderId?: string;
  badgeName?: string;
  queue?: Queue[];
  onHold?: Hold[];
  wins?: number;
  losses?: number;
  badgesAwarded?: number;
  art?: string;
  bio?: string;
  tagline?: string;
  leaderTypeIds?: number[];
  leaderTypes?: Format[];
  champion?: boolean;
  battleFormatIds?: number[];
  battleFormats?: Format[];
  queueOpen?: boolean;
  twitchEnabled?: boolean;

  // Used for match results only!!!
  format?: number;
  difficulty?: number;

  //   Discrepancies with API
  leaderName?: string;
  winCount?: number;
  lossCount?: number;
  leaderType?: number;
  battleFormat?: number;
}

export function isEliteLeader(leader: Leader): boolean {
  return leader.leaderTypeIds!.includes(leaderTypesMap.elite);
}
