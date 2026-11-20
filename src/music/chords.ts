import { Chord, Note } from '@tonaljs/tonal'

export const CHROMATIC_NOTES = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#',
] as const

export type ChordTypeId =
  | 'major' | 'minor' | 'diminished' | 'augmented' | 'sus2' | 'sus4'
  | 'dominant7' | 'major7' | 'minor7' | 'minorMajor7' | 'diminished7'
  | 'halfDiminished7' | 'augmented7' | 'add9' | 'minorAdd9' | 'sixth'
  | 'minor6' | 'ninth' | 'major9' | 'minor9' | 'sevenSus4'

export interface ChordType {
  id: ChordTypeId
  suffix: string
  label: string
  russian: string
  intervals: string[]
  description: string
}

export const CHORD_TYPES: ChordType[] = [
  { id: 'major', suffix: '', label: 'Major', russian: 'Мажорное трезвучие', intervals: ['1', '3', '5'], description: 'Устойчивое и ясное звучание: основа множества песен.' },
  { id: 'minor', suffix: 'm', label: 'Minor', russian: 'Минорное трезвучие', intervals: ['1', '♭3', '5'], description: 'Мягкое и задумчивое звучание с малой терцией.' },
  { id: 'diminished', suffix: 'dim', label: 'Diminished', russian: 'Уменьшённое трезвучие', intervals: ['1', '♭3', '♭5'], description: 'Компактное напряжённое звучание, которое стремится к разрешению.' },
  { id: 'augmented', suffix: 'aug', label: 'Augmented', russian: 'Увеличенное трезвучие', intervals: ['1', '3', '#5'], description: 'Открытое, неустойчивое звучание с увеличенной квинтой.' },
  { id: 'sus2', suffix: 'sus2', label: 'Sus2', russian: 'Аккорд с задержанной секундой', intervals: ['1', '2', '5'], description: 'Терция заменена секундой, поэтому звучание остаётся открытым.' },
  { id: 'sus4', suffix: 'sus4', label: 'Sus4', russian: 'Аккорд с задержанной квартой', intervals: ['1', '4', '5'], description: 'Терция заменена квартой; часто она разрешается в основную терцию.' },
  { id: 'dominant7', suffix: '7', label: '7', russian: 'Доминантсептаккорд', intervals: ['1', '3', '5', '♭7'], description: 'Септаккорд с тяготением к разрешению, часто используется перед тоникой.' },
  { id: 'major7', suffix: 'maj7', label: 'Maj7', russian: 'Большой мажорный септаккорд', intervals: ['1', '3', '5', '7'], description: 'Мажорное трезвучие с большой септимой: мягкое и насыщенное звучание.' },
  { id: 'minor7', suffix: 'm7', label: 'm7', russian: 'Малый минорный септаккорд', intervals: ['1', '♭3', '5', '♭7'], description: 'Минорное трезвучие с малой септимой, характерное для джаза и поп-музыки.' },
  { id: 'minorMajor7', suffix: 'mMaj7', label: 'mMaj7', russian: 'Минорный аккорд с большой септимой', intervals: ['1', '♭3', '5', '7'], description: 'Минорное трезвучие с большой септимой создаёт выразительный контраст.' },
  { id: 'diminished7', suffix: 'dim7', label: 'dim7', russian: 'Уменьшённый септаккорд', intervals: ['1', '♭3', '♭5', '♭♭7'], description: 'Симметричный аккорд с сильным тяготением к разрешению.' },
  { id: 'halfDiminished7', suffix: 'm7b5', label: "m7♭5", russian: 'Полууменьшённый септаккорд', intervals: ['1', '♭3', '♭5', '♭7'], description: 'Уменьшённое трезвучие с малой септимой; часто встречается во II ступени минора.' },
  { id: 'augmented7', suffix: 'aug7', label: 'aug7', russian: 'Увеличенный аккорд с септимой', intervals: ['1', '3', '#5', '♭7'], description: 'Увеличенное трезвучие с малой септимой: яркий доминантовый оттенок.' },
  { id: 'add9', suffix: 'add9', label: 'Add9', russian: 'Мажорный аккорд с добавленной ноной', intervals: ['1', '3', '5', '9'], description: 'К мажорному трезвучию добавлена нона без септимы.' },
  { id: 'minorAdd9', suffix: 'madd9', label: 'madd9', russian: 'Минорный аккорд с добавленной ноной', intervals: ['1', '♭3', '5', '9'], description: 'К минорному трезвучию добавлена нона без септимы.' },
  { id: 'sixth', suffix: '6', label: '6', russian: 'Мажорный секстаккорд', intervals: ['1', '3', '5', '6'], description: 'Мажорное трезвучие с добавленной секстой, дающей мягкий оттенок.' },
  { id: 'minor6', suffix: 'm6', label: 'm6', russian: 'Минорный секстаккорд', intervals: ['1', '♭3', '5', '6'], description: 'Минорное трезвучие с добавленной секстой.' },
  { id: 'ninth', suffix: '9', label: '9', russian: 'Доминантовый нонаккорд', intervals: ['1', '3', '5', '♭7', '9'], description: 'Доминантсептаккорд с добавленной ноной.' },
  { id: 'major9', suffix: 'maj9', label: 'Maj9', russian: 'Большой мажорный нонаккорд', intervals: ['1', '3', '5', '7', '9'], description: 'Мажорный септаккорд с добавленной ноной.' },
  { id: 'minor9', suffix: 'm9', label: 'm9', russian: 'Минорный нонаккорд', intervals: ['1', '♭3', '5', '♭7', '9'], description: 'Минорный септаккорд с добавленной ноной.' },
  { id: 'sevenSus4', suffix: '7sus4', label: '7sus4', russian: 'Доминантсептаккорд с задержанной квартой', intervals: ['1', '4', '5', '♭7'], description: 'Кварта заменяет терцию, а малая септима сохраняет доминантовое звучание.' },
]

export interface BuiltChord {
  root: string
  symbol: string
  name: string
  notes: string[]
  pitchClasses: number[]
  intervals: string[]
  description: string
  type: ChordType
}

export function getChord(root: string, typeId: ChordTypeId): BuiltChord {
  const type = CHORD_TYPES.find((item) => item.id === typeId)
  if (!type) throw new Error(`Unsupported chord type: ${typeId}`)
  if (!CHROMATIC_NOTES.includes(root as (typeof CHROMATIC_NOTES)[number])) {
    throw new Error(`Unsupported root note: ${root}`)
  }

  const chord = Chord.get(`${root}${type.suffix}`)
  if (chord.empty || chord.notes.length === 0) {
    throw new Error(`Unable to build chord: ${root}${type.suffix}`)
  }

  return {
    root,
    symbol: `${root}${type.suffix}`,
    name: chord.name || type.label,
    notes: chord.notes,
    pitchClasses: chord.notes.map((note) => Note.chroma(note) ?? -1),
    intervals: type.intervals,
    description: type.description,
    type,
  }
}

export function pitchClass(note: string): number {
  return Note.chroma(note) ?? -1
}
