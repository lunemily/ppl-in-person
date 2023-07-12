export * from '../environments/environment';

export let battleFormatsMap = {
  // Bitmask; some leaders may support multiple battle formats
  singles: 1,
  doubles: 2,
  multi: 4,
  special: 8,
};

export let battleFormatsReverseMap = {
  // Bitmask; some leaders may support multiple battle formats
  1: 'singles',
  2: 'doubles',
  4: 'multi',
  8: 'special',
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
export let leaderTypesReverseMap = {
  // Bitmask; regular leaders can have teams for multiple difficulty tiers
  1: 'casual',
  2: 'intermediate',
  4: 'veteran',
  // Elite and champ should generally never have any other bitflags set
  8: 'elite',
  16: 'champion',
};
