import { Note } from '@tonaljs/tonal'
import { CHORD_TYPE_BY_ID, type ChordType } from './chordTypes'
import { INTERVAL_BY_ID, type IntervalId } from './intervals'
import { pitchClass } from './notes'

export interface BuiltChord {
  root: string
  type: ChordType
  symbol: string
  noteNames: string[]
  soundCount: number
  pitchClasses: number[]
  intervals: string[]
  description: string
  category: ChordType['category']
}

export function buildChord(root: string, typeId: string): BuiltChord {
  const type = CHORD_TYPE_BY_ID.get(typeId)
  if (!type) throw new Error(`Неизвестный тип аккорда: ${typeId}`)
  if (pitchClass(root) < 0) throw new Error(`Неизвестная основная нота: ${root}`)

  const noteNames = type.intervals.map((intervalId: IntervalId) => {
    const interval = INTERVAL_BY_ID[intervalId]
    return Note.transpose(root, interval.id)
  })
  if (noteNames.some((note) => !note || pitchClass(note) < 0)) {
    throw new Error(`Не удалось построить аккорд ${root}${type.symbol}`)
  }

  return {
    root,
    type,
    symbol: `${root}${type.symbol}`,
    noteNames,
    soundCount: noteNames.length,
    pitchClasses: noteNames.map(pitchClass),
    intervals: type.intervals.map((id: IntervalId) => INTERVAL_BY_ID[id].label),
    description: type.description,
    category: type.category,
  }
}
