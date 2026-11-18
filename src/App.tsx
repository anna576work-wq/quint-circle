import { useMemo, useState } from 'react'
import { circleKeys, displayNote, getKeyData, type Mode } from './music/theory'

const cx = 210
const cy = 210
const polar = (radius: number, index: number) => {
  const angle = (index * 30 - 90) * Math.PI / 180
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
}

function App() {
  const [mode, setMode] = useState<Mode>('major')
  const [tonic, setTonic] = useState('C')
  const [selectedChord, setSelectedChord] = useState(0)
  const keyData = useMemo(() => getKeyData(tonic, mode), [tonic, mode])
  const currentChord = keyData.chords[selectedChord]

  function chooseKey(note: string, nextMode = mode) {
    setMode(nextMode)
    setTonic(note)
    setSelectedChord(0)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Quint Circle — главная"><span className="brand-mark">Q</span><span>QUINT<span className="brand-light">CIRCLE</span></span></a>
        <span className="topbar-caption">ИНТЕРАКТИВНЫЙ СПРАВОЧНИК ПО ГАРМОНИИ</span>
        <button className="help-button" title="Музыкальная логика строится на диатонических гаммах">i</button>
      </header>

      <section className="intro" id="top">
        <div className="eyebrow"><span className="live-dot" /> ПРОСТРАНСТВО ГАРМОНИИ</div>
        <h1>Найди свою <span>тональность.</span></h1>
        <p>Квинтовый круг помогает увидеть связи между тональностями<br className="desktop-break" /> и подобрать аккорды для твоей музыки.</p>
      </section>

      <section className="workspace">
        <div className="circle-panel panel">
          <div className="panel-heading">
            <div><span className="section-kicker">01 / КРУГ</span><h2>Квинтовый круг</h2></div>
            <div className="mode-switch" role="group" aria-label="Лад тональности">
              <button className={mode === 'major' ? 'active' : ''} onClick={() => chooseKey(circleKeys.find(k => k.major === tonic)?.major ?? tonic, 'major')}>Мажор</button>
              <button className={mode === 'minor' ? 'active' : ''} onClick={() => chooseKey(circleKeys.find(k => k.minor === tonic)?.minor ?? tonic, 'minor')}>Минор</button>
            </div>
          </div>
          <div className="circle-wrap">
            <svg className="circle-svg" viewBox="0 0 420 420" role="group" aria-label="Интерактивный круг тональностей">
              <circle cx={cx} cy={cy} r="174" className="ring" />
              <circle cx={cx} cy={cy} r="122" className="ring inner-ring" />
              {circleKeys.map((key, index) => {
                const majorPoint = polar(148, index)
                const minorPoint = polar(96, index)
                const majorSelected = mode === 'major' && tonic === key.major
                const minorSelected = mode === 'minor' && tonic === key.minor
                const relativeSelected = mode === 'major' ? tonic === key.major : tonic === key.minor
                return <g key={key.tonic}>
                  <line x1={polar(122,index).x} y1={polar(122,index).y} x2={polar(174,index).x} y2={polar(174,index).y} className="spoke" />
                  <g className={`circle-note ${majorSelected ? 'selected' : ''} ${relativeSelected && mode === 'minor' ? 'related' : ''}`} role="button" tabIndex={0} aria-label={`Тональность ${key.major} мажор`} onClick={() => chooseKey(key.major, 'major')} onKeyDown={e => e.key === 'Enter' && chooseKey(key.major,'major')}>
                    <circle cx={majorPoint.x} cy={majorPoint.y} r="19"/><text x={majorPoint.x} y={majorPoint.y+4}>{key.major}</text>
                  </g>
                  <g className={`circle-note minor-note ${minorSelected ? 'selected' : ''}`} role="button" tabIndex={0} aria-label={`Тональность ${key.minor} минор`} onClick={() => chooseKey(key.minor, 'minor')} onKeyDown={e => e.key === 'Enter' && chooseKey(key.minor,'minor')}>
                    <circle cx={minorPoint.x} cy={minorPoint.y} r="15"/><text x={minorPoint.x} y={minorPoint.y+4}>{key.minor}</text>
                  </g>
                </g>
              })}
              <text className="ring-label" x="210" y="25">МАЖОР</text><text className="ring-label" x="210" y="101">МИНОР</text>
              <circle cx={cx} cy={cy} r="57" className="center-disc" />
              <text x={cx} y="207" className="center-tonic">{tonic}</text>
              <text x={cx} y="230" className="center-mode">{mode === 'major' ? 'МАЖОР' : 'МИНОР'}</text>
            </svg>
          </div>
          <div className="circle-legend"><span><i className="legend-major"/> Мажорная тональность</span><span><i className="legend-minor"/> Относительный минор</span></div>
        </div>

        <aside className="key-panel panel">
          <div className="section-kicker">02 / ВАША ТОНАЛЬНОСТЬ</div>
          <div className="key-title"><span>{tonic}</span><div><h2>{tonic} {mode === 'major' ? 'мажор' : 'минор'}</h2><p>{mode === 'major' ? 'Светлое, устойчивое звучание' : 'Мягкое, задумчивое звучание'}</p></div></div>
          <div className="key-facts"><div><span>ОТНОСИТЕЛЬНАЯ</span><strong>{keyData.relative} <small>{mode === 'major' ? 'минор' : 'мажор'}</small></strong></div><div><span>ЗНАКИ ПРИ КЛЮЧЕ</span><strong>{keyData.signature}</strong></div></div>
          <div className="divider" />
          <div className="subheading"><div><span className="section-kicker">ЗВУКОРЯД</span><h3>Ноты гаммы</h3></div><span className="note-count">7 НОТ</span></div>
          <div className="notes-row">{keyData.notes.map((note,index)=><span key={`${note}-${index}`} className="note-chip">{note}</span>)}</div>
          <div className="scale-hint">{mode === 'major' ? 'Мажорная гамма' : 'Натуральный минор'} · 7 ступеней</div>
        </aside>
      </section>

      <section className="chords-section panel">
        <div className="panel-heading chord-heading"><div><span className="section-kicker">03 / ГАРМОНИЯ</span><h2>Аккорды тональности</h2></div><span className="chord-caption">СЕМЬ СТУПЕНЕЙ · ТРЕЗВУЧИЯ</span></div>
        <div className="chord-grid">{keyData.chords.map((chord,index)=><button key={`${chord.symbol}-${index}`} className={`chord-card ${selectedChord === index ? 'chosen' : ''}`} onClick={()=>setSelectedChord(index)} aria-pressed={selectedChord===index}>
          <span className="chord-degree">{chord.degree}</span><strong>{chord.symbol}</strong><span className="chord-type">{chord.quality === 'Diminished' ? 'Уменьшённый' : chord.quality === 'Minor' ? 'Минорный' : 'Мажорный'}</span>
        </button>)}</div>
        <div className="chord-detail"><div className="chord-detail-icon">♪</div><div><strong>{currentChord?.symbol} <span>— {currentChord?.quality === 'Minor' ? 'минорное' : currentChord?.quality === 'Diminished' ? 'уменьшённое' : 'мажорное'} трезвучие</span></strong><p>Ноты аккорда: {currentChord?.notes.join(' · ')} <span className="translation">({currentChord?.notes.map(displayNote).join(' · ')})</span></p></div><span className="detail-degree">СТУПЕНЬ {currentChord?.degree}</span></div>
      </section>
      <footer><span>QUINT CIRCLE</span><span>МУЗЫКА НАЧИНАЕТСЯ С ПОНИМАНИЯ</span></footer>
    </main>
  )
}

export default App
