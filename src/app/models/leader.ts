import { Badge } from './badge';
import { Hold } from './hold';
import { Queue } from './queue';

/** This object represents a leader */
export interface Leader {
    id: string;
    leaderId: string;
    displayName?: string;
    badgeName?: string[];
    queue?: Queue[];
    onHold?: Hold[]
  }