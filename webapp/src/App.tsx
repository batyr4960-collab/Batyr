import { useState } from 'react'
import {
  Brain, Calculator, Languages, Camera, Mic, BookOpen,
  Trophy, Flame, Star, ChevronRight, Sparkles, Target,
  Menu, X
} from 'lucide-react'

const subjects = [
  { name: 'Математика', detail: 'Решай задачи с объяснениями', icon: Calculator },
  { name: 'Английский', detail: 'Учи слова и практикуй речь', icon: Languages },
]

export default function App() {
  const [tab, setTab] = useState('Главная')
  const [menu, setMenu] = useState(false)
  const [question, setQuestion] = useState('')

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Brain size={25} /></div>
          <div><b>StudyPilot</b><small>AI LEARNING</small></div>
        </div>
        <button className="avatar" onClick={() => setMenu(!menu)}>Ученик</button>
      </header>

      {menu && <div className="notice">Твой учебный профиль</div>}

      <section className="welcome">
        <div className="eyebrow"><Sparkles size={15} /> ТВОЙ AI-ПОМОЩНИК</div>
        <h1>Учись умнее.<br /><span>Достигай большего.</span></h1>
        <p>Твой личный помощник в математике и английском языке.</p>
        <div className="stats">
          <div><Flame /><b>0 дней</b><small>Серия занятий</small></div>
          <div><Star /><b>0 XP</b><small>Твой опыт</small></div>
          <div><Trophy /><b>0</b><small>Награды</small></div>
        </div>
      </section>

      <section className="section">
        <div className="section-title"><div><small>НАЧНИ ОБУЧЕНИЕ</small><h2>Выбери предмет</h2></div></div>
        <div className="subjects">
          {subjects.map(({ name, detail, icon: Icon }) => (
            <button className="subject" key={name} onClick={() => setTab(name)}>
              <div className="subject-icon"><Icon size={25} /></div>
              <div><b>{name}</b><small>{detail}</small></div>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <small>БЫСТРЫЙ СТАРТ</small>
        <h2>Чем займёмся?</h2>
        <div className="quick-grid">
          <button onClick={() => setTab('Решение задач')}><Camera /><b>Фото задачи</b><small>Разберём по шагам</small></button>
          <button onClick={() => setTab('Голосовой помощник')}><Mic /><b>Голосовой помощник</b><small>Практикуй разговор</small></button>
          <button onClick={() => setTab('Мои заметки')}><BookOpen /><b>Мои заметки</b><small>Сохраняй знания</small></button>
          <button onClick={() => setTab('Цели')}><Target /><b>Мои цели</b><small>Планируй обучение</small></button>
        </div>
      </section>

      {tab !== 'Главная' && (
        <section className="section active-panel">
          <button className="back" onClick={() => setTab('Главная')}>← На главную</button>
          <h2>{tab}</h2>
          <p>Этот раздел пока готовится к подключению AI-помощника.</p>
          <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Напиши, что хочешь изучить..." />
          <button className="primary" onClick={() => setQuestion('')}>Очистить поле</button>
        </section>
      )}

      <footer>
        <div className="footer-logo"><Brain /> StudyPilot AI</div>
        <p>Твой путь к новым знаниям начинается здесь.</p>
      </footer>

      <nav className="bottom-nav">
        {['Главная', 'Задания', 'Прогресс', 'Профиль'].map(item => (
          <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>
            {item === 'Главная' ? '⌂' : item === 'Задания' ? '▣' : item === 'Прогресс' ? '☆' : '◉'}
            <small>{item}</small>
          </button>
        ))}
      </nav>
    </main>
  )
}
