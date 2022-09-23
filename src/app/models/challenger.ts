import { Leader } from './leader';
import { Queue } from './queue';
import { Person } from './person';

/** This object is nearly a 1:1 of the object provided by the badge endpoint */
export interface Challenger extends Person {
  queuesEntered?: Queue[];
  badgesEarned?: Leader[];
}
