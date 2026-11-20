import { Note } from '@tonaljs/tonal'

export const CHROMATIC_NOTES_SHARP = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#',
] as const

export const CHROMATIC_NOTES_FLAT = [
  'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab',
] as const

export const CHROMATIC_NOTES_AUTO = [
  'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
] as const

export type AccidentalPreference = 'auto' | 'sharps' | 'flats'
export type NoteLanguage = 'letters' | 'russian'

export function pitchClass(note: string): number {
  return Note.chroma(note) ?? -1
}

export function noteAtPitchClass(value: number, preference: AccidentalPreference = 'auto'): string {
  const pitch = ((value % 12) + 12) % 12
  const names = preference === 'flats' ? CHROMATIC_NOTES_FLAT : preference === 'sharps' ? CHROMATIC_NOTES_SHARP : CHROMATIC_NOTES_AUTO
  return names.find((note) => pitchClass(note) === pitch) ?? 'C'
}

export function formatNote(note: string, language: NoteLanguage = 'letters'): string {
  if (language === 'letters') return note
  const match = /^([A-G])([#b]*)$/.exec(note)
  if (!match) return note
  const letters: Record<string, string> = { C: 'До', D: 'Ре', E: 'Ми', F: 'Фа', G: 'Соль', A: 'Ля', B: 'Си' }
  const accidentals: Record<string, string> = {
    '#': '-диез', '##': '-дубль-диез',
    b: '-бемоль', bb: '-дубль-бемоль',
  }
  return `${letters[match[1]]}${accidentals[match[2]] ?? ''}`
}

export const enharmonicPitchClassPairs = [
  ['A#', 'Bb'], ['C#', 'Db'], ['D#', 'Eb'], ['F#', 'Gb'], ['G#', 'Ab'],
] as const

export function formatCircleNote(note: string, language: NoteLanguage): string {
  if (language === 'letters') return note.replace(/b/g, '♭').replace(/#/g, '♯')
  const match = /^([A-G])([#b]*)$/.exec(note)
  if (!match) return note
  const letters: Record<string, string> = { C: 'До', D: 'Ре', E: 'Ми', F: 'Фа', G: 'Соль', A: 'Ля', B: 'Си' }
  const marks = match[2].replace(/b/g, '♭').replace(/#/g, '♯')
  return `${letters[match[1]]}${marks}`
}
