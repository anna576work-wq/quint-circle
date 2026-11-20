import { useEffect, useMemo, useState } from 'react'
import { buildChord } from './music/chordBuilder'
import { CHORD_CATEGORIES, CHORD_TYPES, type ChordCategory, type ChordType } from './music/chordTypes'
import { INTERVAL_BY_ID } from './music/intervals'
import { CHROMATIC_NOTES_AUTO, CHROMATIC_NOTES_FLAT, CHROMATIC_NOTES_SHARP, formatCircleNote, formatNote, noteAtPitchClass, pitchClass, type AccidentalPreference, type NoteLanguage } from './music/notes'

const CENTER = 210
const RADIUS = 162
const STORAGE_KEY = 'quint-circle:builder:v2'
const QUICK_TYPES = ['major', 'minor', '7', 'maj7', 'm7', 'sus2', 'sus4', 'diminished', 'augmented']

interface SavedBuilderState {
  version: 2
  rootPitchClass: number
  typeId: string
  accidentalPreference: AccidentalPreference
  noteLanguage: NoteLanguage
  category: ChordCategory
}

function isSavedState(value: unknown): value is SavedBuilderState {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<SavedBuilderState>
  return state.version === 2
    && Number.isInteger(state.rootPitchClass) && (state.rootPitchClass ?? -1) >= 0 && (state.rootPitchClass ?? 12) < 12
    && CHORD_TYPES.some((type) => type.id === state.typeId)
    && ['auto', 'sharps', 'flats'].includes(state.accidentalPreference ?? '')
    && ['letters', 'russian'].includes(state.noteLanguage ?? '')
    && CHORD_CATEGORIES.includes(state.category as ChordCategory)
}

function readSavedState(): SavedBuilderState {
  const fallback: SavedBuilderState = { version: 2, rootPitchClass: pitchClass('A'), typeId: 'major', accidentalPreference: 'auto', noteLanguage: 'letters', category: 'Основные' }
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    return isSavedState(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const polar = (index: number) => {
  const angle = (index * 30 - 90) * Math.PI / 180
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
}

function displayedSymbol(root: string, symbol: string, language: NoteLanguage) {
  return `${formatNote(root, language)}${symbol}`
}

function App() {
  const [saved] = useState(readSavedState)
  const [rootPitchClass, setRootPitchClass] = useState(saved.rootPitchClass)
  const [typeId, setTypeId] = useState(saved.typeId)
  const [accidentalPreference, setAccidentalPreference] = useState<AccidentalPreference>(saved.accidentalPreference)
  const [noteLanguage, setNoteLanguage] = useState<NoteLanguage>(saved.noteLanguage)
  const [category, setCategory] = useState<ChordCategory>(saved.category)

  const root = noteAtPitchClass(rootPitchClass, accidentalPreference)
  const chord = useMemo(() => buildChord(root, typeId), [root, typeId])
  const circleNotes = accidentalPreference === 'flats' ? CHROMATIC_NOTES_FLAT : accidentalPreference === 'sharps' ? CHROMATIC_NOTES_SHARP : CHROMATIC_NOTES_AUTO
  const selectedPitchClasses = new Set(chord.pitchClasses)
  const connectorIndices = chord.pitchClasses
    .map((value) => circleNotes.findIndex((note) => pitchClass(note) === value))
    .filter((index, position, all) => index >= 0 && all.indexOf(index) === position)
  const points = connectorIndices.map(polar)
  const connectorPath = points.length > 1
    ? `${points.map(({ x, y }) => `${x},${y}`).join(' ')} ${points[0].x},${points[0].y}`
    : ''

  useEffect(() => {
    const value: SavedBuilderState = { version: 2, rootPitchClass, typeId, accidentalPreference, noteLanguage, category }
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch { /* storage may be unavailable */ }
  }, [rootPitchClass, typeId, accidentalPreference, noteLanguage, category])

  function chooseType(type: ChordType) {
    setTypeId(type.id)
    setCategory(type.category)
  }

  return (
    <main className="app-shell" id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Quint Circle — главная">
          <span className="brand-mark">Q</span><span>QUINT<span className="brand-light">CIRCLE</span></span>
        </a>
        <div className="preferences">
          <label><span>НОТЫ</span><select aria-label="Язык обозначений нот" value={noteLanguage} onChange={(event) => setNoteLanguage(event.target.value as NoteLanguage)}><option value="letters">C · D · E</option><option value="russian">До · Ре · Ми</option></select></label>
          <label><span>АЛЬТЕРАЦИИ</span><select aria-label="Предпочтение диезов и бемолей" value={accidentalPreference} onChange={(event) => setAccidentalPreference(event.target.value as AccidentalPreference)}><option value="auto">Авто</option><option value="sharps">Диезы</option><option value="flats">Бемоли</option></select></label>
        </div>
      </header>

      <section className="builder" aria-labelledby="page-title">
        <div className="eyebrow"><span className="live-dot" /> КОНСТРУКТОР АККОРДОВ</div>
        <h1 id="page-title">Собери своё звучание</h1>
        <p className="subtitle">Выбери ноту и тип аккорда — состав обновится автоматически.</p>

        <div className="builder-layout">
          <section className="circle-column" aria-label="Выбор основной ноты и состав аккорда">
            <div className="circle-panel">
              <div className="circle" role="group" aria-label="Хроматический круг из 12 нот">
                <svg className="circle-art" viewBox="0 0 420 420" aria-hidden="true">
                  <circle cx={CENTER} cy={CENTER} r="181" className="outer-ring" />
                  {connectorPath && <polyline points={connectorPath} className="chord-connectors" />}
                  <circle cx={CENTER} cy={CENTER} r="60" className="center-disc" />
                  <text x={CENTER} y="205" className="center-name">{displayedSymbol(root, chord.type.symbol, noteLanguage)}</text>
                  <text x={CENTER} y="229" className="center-label">АККОРД</text>
                </svg>
                {circleNotes.map((note, index) => {
                  const { x, y } = polar(index)
                  const notePc = pitchClass(note)
                  const isRoot = notePc === rootPitchClass
                  const isChordTone = !isRoot && selectedPitchClasses.has(notePc)
                  return <button key={notePc} type="button" className={`circle-note${isRoot ? ' selected' : ''}${isChordTone ? ' chord-tone' : ''}`}
                    style={{ left: `${x / 4.2}%`, top: `${y / 4.2}%` }} aria-pressed={isRoot}
                    aria-label={`Выбрать основную ноту ${formatNote(note, noteLanguage)}${isChordTone ? ', входит в аккорд' : ''}`}
                    onClick={() => setRootPitchClass(notePc)}>{formatCircleNote(note, noteLanguage)}</button>
                })}
              </div>
              <div className="circle-legend"><span><i className="legend-root" /> Основной тон</span><span><i className="legend-chord" /> Ноты аккорда</span></div>
            </div>
            <section className="chord-summary" aria-live="polite" aria-labelledby="chord-title">
              <div className="summary-heading"><div><span className="section-kicker">ВЫБРАННЫЙ АККОРД</span>
                <h2 id="chord-title">{displayedSymbol(root, chord.type.symbol, noteLanguage)} <span>{chord.type.russianName}</span></h2></div></div>
              <div className="summary-details">
                <div><span>НОТЫ</span><strong>{chord.noteNames.map((note) => formatNote(note, noteLanguage)).join(' · ')}</strong></div>
                <div><span>ИНТЕРВАЛЫ</span><strong>{chord.intervals.join(' · ')}</strong></div>
                <div><span>ЗВУКОВ</span><strong>{chord.soundCount}</strong></div>
              </div>
              <p className="chord-description">{chord.description}</p>
              <details className="notation-help"><summary>Что означает обозначение?</summary><p><b>m</b> — минор; <b>dim</b> — уменьшённый; <b>aug</b> — увеличенный; <b>sus</b> — задержание; <b>maj7</b> — большая септима; <b>add9</b> — добавленная нона. ♭ понижает ступень, ♯ повышает.</p></details>
            </section>
          </section>

          <section className="type-panel" aria-labelledby="type-title">
            <div className="section-kicker">ТИП АККОРДА</div>
            <h2 id="type-title">Выберите звучание</h2>
            <div className="quick-types" aria-label="Популярные типы аккордов">
              {QUICK_TYPES.map((id) => { const type = CHORD_TYPES.find((item) => item.id === id)!; return <button type="button" key={id} className={`quick-type${typeId === id ? ' active' : ''}`} aria-pressed={typeId === id} onClick={() => chooseType(type)}>{type.symbol || 'Major'}</button> })}
            </div>
            <div className="category-tabs" role="tablist" aria-label="Категории аккордов">
              {CHORD_CATEGORIES.map((item) => <button type="button" role="tab" aria-selected={category === item} key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="type-grid" role="group" aria-label={`Типы аккордов: ${category}`}>
              {CHORD_TYPES.filter((type) => type.category === category).map((type) => <button key={type.id} type="button" className={`type-option${typeId === type.id ? ' active' : ''}`} aria-pressed={typeId === type.id} onClick={() => chooseType(type)}>
                <strong>{type.symbol || 'Major'}</strong><span>{type.russianName}</span><small>{type.intervals.length} нот · {type.intervals.map((id) => INTERVAL_BY_ID[id].label).join(' · ')}</small>
              </button>)}
            </div>
          </section>
        </div>
      </section>
      <footer><span>QUINT CIRCLE</span><span>{CHORD_TYPES.length} ТИПА АККОРДОВ · ВЫЧИСЛЕНИЯ В БРАУЗЕРЕ</span></footer>
    </main>
  )
}

export default App
