import { Leader } from './leader';
import { Queue } from './queue';
import { Person } from './person';

/** This object is nearly a 1:1 of the object provided by the badge endpoint */
export interface Challenger extends Person {
  queuesEntered?: Queue[];
  badgesEarned?: Leader[];
  championSurveyUrl?: string;
  battleStats?: {
    winCount: number;
    lossCount: number;
  };
  hasBingo?: boolean;

  //   Discrepancies with API
  name?: string;
  winCount?: number;
  lossCount?: number;
  championDefeated?: boolean;
  queuesOnHold?: Queue[];
}
