import { describe, expect, it } from 'vitest'
import { CHORD_TYPES, CHROMATIC_NOTES, getChord, pitchClass } from './chords'

describe('chromatic chord model', () => {
  it('keeps the requested chromatic order fixed', () => {
    expect(CHROMATIC_NOTES).toEqual(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'])
  })

  it.each([
    ['major', ['C', 'E', 'G']],
    ['minor', ['C', 'Eb', 'G']],
    ['diminished', ['C', 'Eb', 'Gb']],
    ['augmented', ['C', 'E', 'G#']],
    ['sus2', ['C', 'D', 'G']],
    ['sus4', ['C', 'F', 'G']],
    ['dominant7', ['C', 'E', 'G', 'Bb']],
    ['major7', ['C', 'E', 'G', 'B']],
    ['minor7', ['C', 'Eb', 'G', 'Bb']],
    ['add9', ['C', 'E', 'G', 'D']],
  ] as const)('builds the expected notes for %s', (type, notes) => {
    expect(getChord('C', type).notes).toEqual(notes)
  })

  it('builds every supported chord type for several roots', () => {
    for (const root of ['A', 'C', 'F#'] as const) {
      for (const type of CHORD_TYPES) {
        const chord = getChord(root, type.id)
        expect(chord.notes.length, `${root}${type.suffix}`).toBeGreaterThan(0)
        expect(chord.pitchClasses).toHaveLength(chord.notes.length)
        expect(chord.intervals).toHaveLength(chord.notes.length)
      }
    }
  })

  it('treats enharmonic roots as the same pitch class while preserving chord spelling', () => {
    const sharp = getChord('A#', 'major')
    const flat = getChord('A#', 'minor')
    expect(sharp.notes).toEqual(['A#', 'C##', 'E#'])
    expect(sharp.pitchClasses).toEqual(['Bb', 'D', 'F'].map(pitchClass))
    expect(flat.pitchClasses).toEqual(['Bb', 'Db', 'F'].map(pitchClass))
  })
})
