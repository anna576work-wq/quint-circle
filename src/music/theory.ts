import { Chord, Key, Note, Scale } from '@tonaljs/tonal'

export const circleKeys = [
  { tonic: 'C', major: 'C', minor: 'A', signature: '0' },
  { tonic: 'G', major: 'G', minor: 'E', signature: '1♯' },
  { tonic: 'D', major: 'D', minor: 'B', signature: '2♯' },
  { tonic: 'A', major: 'A', minor: 'F#', signature: '3♯' },
  { tonic: 'E', major: 'E', minor: 'C#', signature: '4♯' },
  { tonic: 'B', major: 'B', minor: 'G#', signature: '5♯' },
  { tonic: 'F#', major: 'F#', minor: 'D#', signature: '6♯' },
  { tonic: 'Db', major: 'Db', minor: 'Bb', signature: '5♭' },
  { tonic: 'Ab', major: 'Ab', minor: 'F', signature: '4♭' },
  { tonic: 'Eb', major: 'Eb', minor: 'C', signature: '3♭' },
  { tonic: 'Bb', major: 'Bb', minor: 'G', signature: '2♭' },
  { tonic: 'F', major: 'F', minor: 'D', signature: '1♭' },
] as const

export type Mode = 'major' | 'minor'

export function displayNote(note: string) {
  const parsed = Note.get(note)
  if (!parsed.name) return note
  const names: Record<string, string> = { C: 'До', D: 'Ре', E: 'Ми', F: 'Фа', G: 'Соль', A: 'Ля', B: 'Си' }
  const accidental = parsed.acc === '#' ? '-диез' : parsed.acc === 'b' ? '-бемоль' : ''
  return `${names[parsed.letter] ?? parsed.letter}${accidental}`
}

export function getKeyData(tonic: string, mode: Mode) {
  const scaleName = `${tonic} ${mode === 'major' ? 'major' : 'minor'}`
  const scale = Scale.get(scaleName)
  const symbols = mode === 'major' ? Key.majorKey(tonic).triads : Key.minorKey(tonic).natural.triads
  const chords = symbols.map((symbol, index) => {
    const chord = Chord.get(symbol)
    return {
      symbol,
      tonic: chord.tonic || scale.notes[index] || '',
      notes: chord.notes,
      quality: chord.type,
      degree: mode === 'major'
        ? ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'][index]
        : ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'][index],
    }
  })
  const circleKey = circleKeys.find((item) => (mode === 'major' ? item.major : item.minor) === tonic)
  return { notes: scale.notes, chords, signature: circleKey?.signature ?? '—', relative: circleKey ? (mode === 'major' ? circleKey.minor : circleKey.major) : '—' }
}
