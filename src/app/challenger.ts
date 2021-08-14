import { Badge } from './badge';

/** This object is nearly a 1:1 of the object provided by the badge endpoint */
export interface Challenger {
    id: string;
    name?: string;
    badges?: string[];
    queueOpen?: string[];
    casualLeaders?: Badge[];
    veteranLeaders?: Badge[];
    elites?: Badge[];
    champions?: Badge[];
  }