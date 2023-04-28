export * from '../environments/environment';

export let battleFormatsMap = {
  // Bitmask; some leaders may support multiple battle formats
  singles: 1,
  doubles: 2,
  multi: 4,
  gimmick: 8,
};

export let leaderTypesMap = {
  // Bitmask; regular leaders can have teams for multiple difficulty tiers
  casual: 1,
  intermediate: 2,
  veteran: 4,
  // Elite and champ should generally never have any other bitflags set
  elite: 8,
  champion: 16,
};
