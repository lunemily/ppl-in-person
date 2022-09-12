import { Leader } from './leader';
import { Queue } from './queue';

/** This object is nearly a 1:1 of the object provided by the badge endpoint */
export interface Challenger {
  id: string;
  displayName?: string;
  queuesEntered?: Queue[];
  badgesEarned?: Leader[];
}
