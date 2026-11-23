
import { useState } from 'react'
import {
  Brain, Calculator, Languages, FlaskConical, Atom,
  BookOpen, Globe, Landmark, Monitor, Microscope,
  Camera, Mic, Target, Trophy, Flame, Star,
  ChevronRight, Sparkles, GraduationCap,
  Home, ClipboardList, User, ChartNoAxesCombined
} from 'lucide-react'

const subjects = [
  { name: 'Математика', detail: 'Задачи и формулы', icon: Calculator, color: 'blue' },
  { name: 'Английский', detail: 'Слова и разговорная практика', icon: Languages, color: 'purple' },
  { name: 'Русский язык', detail: 'Грамматика и правила', icon: BookOpen, color: 'pink' },
  { name: 'Литература', detail: 'Книги и анализ произведений', icon: BookOpen, color: 'orange' },
  { name: 'Физика', detail: 'Законы и эксперименты', icon: Atom, color: 'blue' },
  { name: 'Химия', detail: 'Реакции и вещества', icon: FlaskConical, color: 'green' },
  { name: 'Биология', detail: 'Живой мир и человек', icon: Microscope, color: 'green' },
  { name: 'История', detail: 'События и цивилизации', icon: Landmark, color: 'orange' },
  { name: 'География', detail: 'Страны и планета', icon: Globe, color: 'blue' },
  { name: 'Информатика', detail: 'Технологии и код', icon: Monitor, color: 'purple' },
]

const quickActions = [
  { name: 'Фото задачи', detail: 'Разобрать задание', icon: Camera },
  { name: 'Голосовой учитель', detail: 'Поговорить с AI', icon: Mic },
  { name: 'Мои заметки', detail: 'Повторить материал', icon: BookOpen },
  { name: 'Мои цели', detail: 'Составить план', icon: Target },
]

export default function App() {
  const [tab, setTab] = useState('Главная')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [question, setQuestion] = useState('')

  const openSubject = (name: string) => {
    setSelectedSubject(name)
    setTab('Предмет')
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Brain size={25} /></div>
          <div>
            <b>StudyPilot <span>AI</span></b>
            <small>YOUR SMART LEARNING COMPANION</small>
          </div>
        </div>
        <button className="profile-button" onClick={() => setTab('Профиль')}>
          <User size={18} />
        </button>
      </header>

      {tab === 'Главная' && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={14} /> ТВОЙ AI-НАСТАВНИК</div>
              <h1>Учись умнее.<br /><span>Расти каждый день.</span></h1>
              <p>Знания становятся ближе, когда рядом правильный помощник.</p>
              <button className="hero-button" onClick={() => setTab('Предметы')}>
                Начать обучение <ChevronRight size={18} />
              </button>
            </div>
            <div className="robot-wrap">
              <div className="robot-glow" />
              <div className="robot">
                <div className="robot-cap"><GraduationCap size={34} /></div>
                <div className="robot-antenna" />
                <div className="robot-head">
                  <div className="robot-ear left" />
                  <div className="robot-face">
                    <i /><i />
                    <div className="robot-mouth" />
                  </div>
                  <div className="robot-ear right" />
                </div>
                <div className="robot-body">
                  <Brain size={25} />
                </div>
              </div>
              <span className="robot-label">PILOT • AI</span>
            </div>
          </section>

          <section className="stats">
            <div className="stat-card">
              <Flame />
              <b>0 дней</b>
              <small>Серия занятий</small>
            </div>
            <div className="stat-card">
              <Star />
              <b>0 XP</b>
              <small>Твой опыт</small>
            </div>
            <div className="stat-card">
              <Trophy />
              <b>0</b>
              <small>Награды</small>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <small>ТВОЁ ОБУЧЕНИЕ</small>
                <h2>Выбери предмет</h2>
              </div>
              <button className="text-button" onClick={() => setTab('Предметы')}>Все <ChevronRight size={16} /></button>
            </div>
            <div className="subject-grid">
              {subjects.slice(0, 4).map(({ name, detail, icon: Icon, color }) => (
                <button className="subject-card" key={name} onClick={() => openSubject(name)}>
                  <div className={`subject-icon ${color}`}><Icon size={23} /></div>
                  <b>{name}</b>
                  <small>{detail}</small>
                  <ChevronRight className="subject-arrow" size={17} />
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <small>ПОМОЩНИК ВСЕГДА РЯДОМ</small>
                <h2>Быстрый старт</h2>
              </div>
            </div>
            <div className="quick-grid">
              {quickActions.map(({ name, detail, icon: Icon }) => (
                <button className="quick-card" key={name} onClick={() => setTab(name)}>
                  <Icon size={23} />
                  <b>{name}</b>
                  <small>{detail}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="daily-card">
            <div className="daily-icon"><Target size={25} /></div>
            <div>
              <small>ТВОЯ ЦЕЛЬ НА СЕГОДНЯ</small>
              <b>Сделай первый шаг!</b>
              <p>Позанимайся сегодня и начни свою серию занятий.</p>
            </div>
          </section>
        </>
      )}

      {tab === 'Предметы' && (
        <section className="section page-section">
          <button className="back-button" onClick={() => setTab('Главная')}>← На главную</button>
          <small>ТВОЯ БИБЛИОТЕКА ЗНАНИЙ</small>
          <h2>Все предметы</h2>
          <div className="subject-grid">
            {subjects.map(({ name, detail, icon: Icon, color }) => (
              <button className="subject-card" key={name} onClick={() => openSubject(name)}>
                <div className={`subject-icon ${color}`}><Icon size={23} /></div>
                <b>{name}</b>
                <small>{detail}</small>
                <ChevronRight className="subject-arrow" size={17} />
              </button>
            ))}
          </div>
        </section>
      )}

      {tab === 'Предмет' && (
        <section className="section page-section">
          <button className="back-button" onClick={() => setTab('Предметы')}>← Все предметы</button>
          <div className="eyebrow"><Sparkles size={14} /> STUDYPILOT AI</div>
          <h2>{selectedSubject}</h2>
          <div className="empty-card">
            <div className="subject-icon blue"><Brain size={28} /></div>
            <h3>Твой учебный кабинет</h3>
            <p>Здесь появятся объяснения, упражнения и проверка знаний по предмету.</p>
            <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Напиши, что хочешь изучить..." />
            <button className="hero-button" onClick={() => setQuestion('')}>Очистить поле</button>
            <small>AI-помощник пока не подключён.</small>
          </div>
        </section>
      )}

      {tab !== 'Главная' && tab !== 'Предметы' && tab !== 'Предмет' && (
        <section className="section page-section">
          <button className="back-button" onClick={() => setTab('Главная')}>← На главную</button>
          <h2>{tab}</h2>
          <div className="empty-card">
            <Sparkles size={30} />
            <h3>Скоро здесь будет больше возможностей!</h3>
            <p>Мы постепенно создаём этот раздел StudyPilot AI.</p>
          </div>
        </section>
      )}

      <nav className="bottom-nav">
        <button className={tab === 'Главная' ? 'selected' : ''} onClick={() => setTab('Главная')}>
          <Home /><small>Главная</small>
        </button>
        <button className={tab === 'Предметы' ? 'selected' : ''} onClick={() => setTab('Предметы')}>
          <ClipboardList /><small>Предметы</small>
        </button>
        <button className={tab === 'Прогресс' ? 'selected' : ''} onClick={() => setTab('Прогресс')}>
          <ChartNoAxesCombined /><small>Прогресс</small>
        </button>
        <button className={tab === 'Профиль' ? 'selected' : ''} onClick={() => setTab('Профиль')}>
          <User /><small>Профиль</small>
        </button>
      </nav>
    </main>
  )
}
