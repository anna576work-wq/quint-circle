import { describe, expect, it } from 'vitest'
import { buildChord } from './chordBuilder'
import { CHORD_TYPES } from './chordTypes'
import { CHROMATIC_NOTES_FLAT, CHROMATIC_NOTES_SHARP, pitchClass } from './notes'

const expectedNotes: Record<string, string[]> = {
  major: ['C', 'E', 'G'], minor: ['C', 'Eb', 'G'], power: ['C', 'G'],
  diminished: ['C', 'Eb', 'Gb'], augmented: ['C', 'E', 'G#'],
  sus2: ['C', 'D', 'G'], sus4: ['C', 'F', 'G'],
  '7sus2': ['C', 'D', 'G', 'Bb'], '7sus4': ['C', 'F', 'G', 'Bb'],
  '7': ['C', 'E', 'G', 'Bb'], maj7: ['C', 'E', 'G', 'B'],
  m7: ['C', 'Eb', 'G', 'Bb'], mMaj7: ['C', 'Eb', 'G', 'B'],
  dim7: ['C', 'Eb', 'Gb', 'Bbb'], m7b5: ['C', 'Eb', 'Gb', 'Bb'],
  aug7: ['C', 'E', 'G#', 'Bb'], augMaj7: ['C', 'E', 'G#', 'B'],
  '6': ['C', 'E', 'G', 'A'], m6: ['C', 'Eb', 'G', 'A'],
  '6/9': ['C', 'E', 'G', 'A', 'D'], 'm6/9': ['C', 'Eb', 'G', 'A', 'D'],
  add9: ['C', 'E', 'G', 'D'], madd9: ['C', 'Eb', 'G', 'D'],
  add11: ['C', 'E', 'G', 'F'], madd11: ['C', 'Eb', 'G', 'F'],
  '9': ['C', 'E', 'G', 'Bb', 'D'], maj9: ['C', 'E', 'G', 'B', 'D'],
  m9: ['C', 'Eb', 'G', 'Bb', 'D'], mMaj9: ['C', 'Eb', 'G', 'B', 'D'],
  '11': ['C', 'E', 'G', 'Bb', 'D', 'F'],
  m11: ['C', 'Eb', 'G', 'Bb', 'D', 'F'],
  maj11: ['C', 'E', 'G', 'B', 'D', 'F'],
  '13': ['C', 'E', 'G', 'Bb', 'D', 'F', 'A'],
  m13: ['C', 'Eb', 'G', 'Bb', 'D', 'F', 'A'],
  maj13: ['C', 'E', 'G', 'B', 'D', 'F', 'A'],
  '7b5': ['C', 'E', 'Gb', 'Bb'], '7#5': ['C', 'E', 'G#', 'Bb'],
  '7b9': ['C', 'E', 'G', 'Bb', 'Db'], '7#9': ['C', 'E', 'G', 'Bb', 'D#'],
  '7#11': ['C', 'E', 'G', 'Bb', 'F#'], '7b13': ['C', 'E', 'G', 'Bb', 'Ab'],
  '7b9#5': ['C', 'E', 'G#', 'Bb', 'Db'],
  '7#9b13': ['C', 'E', 'G', 'Bb', 'D#', 'Ab'],
}

describe('chord builder', () => {
  it('has the fixed 12-note chromatic circle in both spelling preferences', () => {
    expect(CHROMATIC_NOTES_SHARP).toEqual(['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'])
    expect(CHROMATIC_NOTES_FLAT).toEqual(['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab'])
    expect(CHROMATIC_NOTES_SHARP.map(pitchClass)).toEqual(CHROMATIC_NOTES_FLAT.map(pitchClass))
  })

  it.each(Object.entries(expectedNotes))('builds %s with the specified theoretical spelling', (typeId, notes) => {
    expect(buildChord('C', typeId).noteNames).toEqual(notes)
  })

  it('contains the complete 43-type catalog and builds every type from all 12 roots', () => {
    expect(CHORD_TYPES).toHaveLength(43)
    expect(CHORD_TYPES.map((type) => type.id).sort()).toEqual(Object.keys(expectedNotes).sort())
    for (const root of CHROMATIC_NOTES_SHARP) {
      for (const type of CHORD_TYPES) {
        const chord = buildChord(root, type.id)
        expect(chord.noteNames, `${root}${type.symbol}`).toHaveLength(type.intervals.length)
        expect(chord.soundCount, `${root}${type.symbol}`).toBe(type.intervals.length)
        expect(chord.pitchClasses, `${root}${type.symbol}`).toHaveLength(type.intervals.length)
        expect(chord.intervals, `${root}${type.symbol}`).toHaveLength(type.intervals.length)
        expect(chord.pitchClasses.every((pc) => pc >= 0 && pc < 12)).toBe(true)
      }
    }
  })

  it('spells augmented and diminished intervals with the correct letter names', () => {
    expect(buildChord('C#', 'major').noteNames).toEqual(['C#', 'E#', 'G#'])
    expect(buildChord('C', 'dim7').noteNames[3]).toBe('Bbb')
  })

  it('keeps enharmonic spellings distinct while using equal pitch classes', () => {
    const sharpRoot = buildChord('A#', 'major')
    const flatRoot = buildChord('Bb', 'major')
    expect(sharpRoot.noteNames).toEqual(['A#', 'C##', 'E#'])
    expect(flatRoot.noteNames).toEqual(['Bb', 'D', 'F'])
    expect(sharpRoot.pitchClasses).toEqual(flatRoot.pitchClasses)
    expect(buildChord('Bb', 'minor').noteNames).toEqual(['Bb', 'Db', 'F'])
  })
})
