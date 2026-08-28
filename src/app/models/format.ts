import { battleFormatsMap } from '../constants.data';

export enum Game {
  ScarletViolet = 'scarlet-violet',
  Champions = 'pokemon-champions',
}

export interface Format {
  id: number;
  name: string;
  games?: Game[];
}

/**
 * Convert bitmask for leaderTypes
 */
export function getBattleFormatsFromBitmask(bitmask: number): number[] {
  const battleFormats = [];
  for (const key of Object.keys(battleFormatsMap)) {
    if (bitmask & battleFormatsMap[key]) {
      battleFormats.push(battleFormatsMap[key]);
    }
  }

  return battleFormats;
}
