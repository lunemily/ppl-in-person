import { Badge } from './badge';

/** This object represents a leader */
export interface Leader {
    id: string;
    name?: string;
    badgeName?: string[];
    queue?: string[];
  }