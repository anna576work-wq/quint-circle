import { useMemo, useState } from 'react'
import { CHROMATIC_NOTES, getChord, pitchClass } from './music/chords'

const CENTER = 210
const RADIUS = 161
const pointAt = (index: number) => {
  const angle = (index * 30 - 90) * Math.PI / 180
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
}

function App() {
  const [root, setRoot] = useState<(typeof CHROMATIC_NOTES)[number]>('A')
  const chord = useMemo(() => getChord(root, 'major'), [root])
  const chordPositions = chord.pitchClasses
    .map((tone) => CHROMATIC_NOTES.findIndex((note) => pitchClass(note) === tone))
    .filter((index) => index >= 0)
  const connectorPoints = chordPositions.map(pointAt)
  const connectorPath = connectorPoints.length > 1
    ? `${connectorPoints.map((point) => `${point.x},${point.y}`).join(' ')} ${connectorPoints[0].x},${connectorPoints[0].y}`
    : ''

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Quint Circle — главная">
          <span className="brand-mark">Q</span>
          <span>QUINT<span className="brand-light">CIRCLE</span></span>
        </a>
        <span className="topbar-caption">ИНТЕРАКТИВНЫЙ КОНСТРУКТОР АККОРДОВ</span>
      </header>

      <section className="builder" id="top" aria-labelledby="page-title">
        <div className="eyebrow"><span className="live-dot" /> ХРОМАТИЧЕСКИЙ КРУГ</div>
        <h1 id="page-title">Выбери основную ноту</h1>
        <p className="subtitle">Нажми на ноту, чтобы увидеть аккорд и его состав.</p>

        <div className="circle-panel">
          <div className="circle" role="group" aria-label="Хроматический круг из 12 нот">
            <svg className="circle-art" viewBox="0 0 420 420" aria-hidden="true">
              <circle cx={CENTER} cy={CENTER} r="181" className="outer-ring" />
              <circle cx={CENTER} cy={CENTER} r="128" className="inner-ring" />
              {connectorPath && <polyline points={connectorPath} className="chord-connectors" />}
              <circle cx={CENTER} cy={CENTER} r="60" className="center-disc" />
              <text x={CENTER} y="205" className="center-name">{chord.symbol}</text>
              <text x={CENTER} y="229" className="center-label">МАЖОР</text>
            </svg>
            {CHROMATIC_NOTES.map((note, index) => {
              const { x, y } = pointAt(index)
              const active = note === root
              const chordTone = !active && chord.pitchClasses.includes(pitchClass(note))
              return (
                <button
                  key={note}
                  type="button"
                  className={`circle-note${active ? ' selected' : ''}${chordTone ? ' chord-tone' : ''}`}
                  style={{ left: `${x / 4.2}%`, top: `${y / 4.2}%` }}
                  aria-pressed={active}
                  aria-label={`Выбрать ноту ${note}${chordTone ? ', входит в аккорд' : ''}`}
                  onClick={() => setRoot(note)}
                >
                  {note}
                </button>
              )
            })}
          </div>
          <div className="circle-legend" aria-label="Обозначения круга">
            <span><i className="legend-root" /> Основной тон</span>
            <span><i className="legend-chord" /> Нота аккорда</span>
          </div>
        </div>

        <section className="chord-summary" aria-live="polite" aria-labelledby="chord-title">
          <div className="summary-heading">
            <div>
              <span className="section-kicker">ВЫБРАННЫЙ АККОРД</span>
              <h2 id="chord-title">{chord.symbol} <span>{chord.type.russian}</span></h2>
            </div>
            <label className="root-picker">
              <span>ОСНОВНОЙ ТОН</span>
              <select value={root} onChange={(event) => setRoot(event.target.value as typeof root)}>
                {CHROMATIC_NOTES.map((note) => <option key={note} value={note}>{note}</option>)}
              </select>
            </label>
          </div>
          <div className="summary-details">
            <div><span>НОТЫ</span><strong>{chord.notes.join(' · ')}</strong></div>
            <div><span>ИНТЕРВАЛЫ</span><strong>{chord.intervals.join(' · ')}</strong></div>
          </div>
          <p className="chord-description">{chord.description}</p>
        </section>
      </section>
      <footer><span>QUINT CIRCLE</span><span>12 ЗВУКОВЫСОТНЫХ КЛАССОВ</span></footer>
    </main>
  )
}

export default App
