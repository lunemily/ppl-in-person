import { Hold } from './hold';
import { Queue } from './queue';
import { Person } from './person';
import { Format } from './format';

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
}

// export isEliteLeader
