export const INTERVALS = {
  unison: { id: '1P', label: '1', semitones: 0 },
  minorSecond: { id: '2m', label: '♭2', semitones: 1 },
  majorSecond: { id: '2M', label: '2', semitones: 2 },
  augmentedSecond: { id: '2A', label: '♯2', semitones: 3 },
  minorThird: { id: '3m', label: '♭3', semitones: 3 },
  majorThird: { id: '3M', label: '3', semitones: 4 },
  perfectFourth: { id: '4P', label: '4', semitones: 5 },
  augmentedFourth: { id: '4A', label: '♯4', semitones: 6 },
  diminishedFifth: { id: '5d', label: '♭5', semitones: 6 },
  perfectFifth: { id: '5P', label: '5', semitones: 7 },
  augmentedFifth: { id: '5A', label: '♯5', semitones: 8 },
  minorSixth: { id: '6m', label: '♭6', semitones: 8 },
  majorSixth: { id: '6M', label: '6', semitones: 9 },
  diminishedSeventh: { id: '7d', label: '♭♭7', semitones: 9 },
  minorSeventh: { id: '7m', label: '♭7', semitones: 10 },
  majorSeventh: { id: '7M', label: '7', semitones: 11 },
  minorNinth: { id: '9m', label: '♭9', semitones: 13 },
  majorNinth: { id: '9M', label: '9', semitones: 14 },
  augmentedNinth: { id: '9A', label: '♯9', semitones: 15 },
  perfectEleventh: { id: '11P', label: '11', semitones: 17 },
  augmentedEleventh: { id: '11A', label: '♯11', semitones: 18 },
  minorThirteenth: { id: '13m', label: '♭13', semitones: 20 },
  majorThirteenth: { id: '13M', label: '13', semitones: 21 },
} as const

export type IntervalId = (typeof INTERVALS)[keyof typeof INTERVALS]['id']
export const INTERVAL_BY_ID = Object.fromEntries(
  Object.values(INTERVALS).map((interval) => [interval.id, interval]),
) as Record<IntervalId, (typeof INTERVALS)[keyof typeof INTERVALS]>
