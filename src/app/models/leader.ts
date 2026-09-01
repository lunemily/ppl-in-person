import { Hold } from './hold';
import { Queue } from './queue';
import { Person } from './person';
import { Format, Game, getBattleFormatsFromBitmask } from './format';
import { battleFormatsMap, battleFormatsReverseMap, leaderTypesMap, leaderTypesReverseMap } from '../constants.data';

/** This object represents a leader */
export interface Leader extends Person {
  leaderId?: string;
  badgeName?: string;
  queue?: Queue[];
  onHold?: Hold[];
  wins?: number;
  losses?: number;
  badgesAwarded?: number;
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
  name?: string;
}

/**
 * Convert bitmask for leaderTypes
 */
export function getLeaderTypesFromBitmask(bitmask: number): number[] {
  const leaderTypes = [];
  for (const key of Object.keys(leaderTypesMap)) {
    if (bitmask & leaderTypesMap[key]) {
      leaderTypes.push(leaderTypesMap[key]);
    }
  }

  return leaderTypes;
}

export function isEliteLeader(leader: Leader): boolean {
  return leader.leaderTypeIds!.includes(leaderTypesMap.elite);
}

export function leaderSupportsChampions(formatIds: number[]): boolean {
  return formatIds.includes(battleFormatsMap.champions);
}

export function leaderFromResponse(id: string, rawLeader: Leader): Leader {
  return {
    id,
    leaderId: rawLeader.leaderId ? rawLeader.leaderId : id,
    displayName: rawLeader.leaderName ? rawLeader.leaderName : rawLeader.name,
    badgeName: rawLeader.badgeName,
    bio: rawLeader.bio,
    battleFormatIds: getBattleFormatsFromBitmask(rawLeader.battleFormat),
    battleFormats: getBattleFormatsFromBitmask(rawLeader.battleFormat)
      .map(function (formatId, index, formatIds) {
        const format: Format = {
          id: formatId,
          name: battleFormatsReverseMap[formatId],
          games:
            formatId !== battleFormatsMap.special
              ? leaderSupportsChampions(formatIds)
                ? [Game.ScarletViolet, Game.Champions]
                : [Game.ScarletViolet]
              : [],
        };
        return format;
      }, [])
      .filter((format) => format.id !== battleFormatsMap.champions),
    leaderTypeIds: getLeaderTypesFromBitmask(rawLeader.leaderType),
    leaderTypes: getLeaderTypesFromBitmask(rawLeader.leaderType).map(function (typeId) {
      const type: Format = {
        id: typeId,
        name: leaderTypesReverseMap[typeId],
      };
      return type;
    }, []),
    queue: rawLeader.queue
      ? rawLeader.queue.map(function (item) {
          const queue: Queue = {
            position: item.position,
            challengerId: item.challengerId,
            displayName: item.displayName,
            battleCode: item.linkCode,
            battleFormat: {
              id: item.format,
              name: battleFormatsReverseMap[item.format],
            },
            battleDifficulty: {
              id: item.difficulty,
              name: leaderTypesReverseMap[item.difficulty],
            },
          };
          return queue;
        }, [])
      : [],
    queueOpen: rawLeader.queueOpen,
    onHold: rawLeader.onHold
      ? rawLeader.onHold.map(function (item) {
          const hold: Hold = {
            challengerId: item.challengerId,
            displayName: item.displayName,
          };
          return hold;
        }, [])
      : [],
    twitchEnabled: rawLeader.twitchEnabled,
    wins: rawLeader.winCount,
    losses: rawLeader.lossCount,
    badgesAwarded: rawLeader.badgesAwarded,
    feedbackSurveyUrl: rawLeader.feedbackSurveyUrl ? rawLeader.feedbackSurveyUrl : null,
  };
}
