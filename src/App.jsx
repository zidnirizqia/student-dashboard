// App — root component.
// Owns all shared state: active view, task list, profile, search query.
// Persists tasks and profile to localStorage via useEffect.

import { useState, useEffect } from 'react'
import { initialTasks, initialProfile } from './data/initialData'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import KpiCards from './components/KpiCards'
import TaskList from './components/TaskList'
import Schedule from './components/Schedule'
import ProfileCard from './components/ProfileCard'

// localStorage helpers — JSON encode/decode with a fallback
function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage quota exceeded — silently skip
  }
}

// Auto-increment ID for new tasks
let nextId = null

export default function App() {
  // Hydrate from localStorage on first render; fall back to initial sample data
  const [tasks, setTasks] = useState(() => loadStored('sd_tasks', initialTasks))
  const [profile, setProfile] = useState(() => loadStored('sd_profile', initialProfile))
  const [activeView, setActiveView] = useState('Dashboard')
  const [search, setSearch] = useState('')

  // Initialise nextId from the highest existing task id
  if (nextId === null) {
    nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1
  }

  // Persist tasks whenever they change
  useEffect(() => { saveStored('sd_tasks', tasks) }, [tasks])

  // Persist profile whenever it changes
  useEffect(() => { saveStored('sd_profile', profile) }, [profile])

  // ----- Task handlers -----

  function handleAddTask({ title, deadline, done }) {
    setTasks((prev) => [...prev, { id: nextId++, title, deadline, done }])
  }

  function handleToggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // ----- Profile handler -----

  function handleSaveProfile(updated) {
    setProfile(updated)
  }

  // ----- View renderer -----
  // Dashboard shows KpiCards + TaskList + Schedule together.
  // Other views show only their own section.

  function renderContent() {
    switch (activeView) {
      case 'Dashboard':
        return (
          <>
            <KpiCards tasks={tasks} />
            <TaskList
              tasks={tasks}
              onAdd={handleAddTask}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              search={search}
            />
            <Schedule />
          </>
        )
      case 'Tugas':
        return (
          <TaskList
            tasks={tasks}
            onAdd={handleAddTask}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            search={search}
          />
        )
      case 'Jadwal':
        return <Schedule />
      case 'Profil':
        return <ProfileCard profile={profile} onSave={handleSaveProfile} />
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <div className="main-area">
        <Topbar
          activeView={activeView}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="content" id="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
