// TaskList — full CRUD task manager.
// Features: add (title + deadline), toggle done, delete, filter buttons, live search.
// "Terlambat" is derived: not done AND deadline < today. No status field stored.

import { useState, useMemo } from 'react'

// Returns today at midnight for deadline comparisons
function todayMidnight() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// Derive the display status of a task
function getStatus(task) {
  if (task.done) return 'Selesai'
  if (task.deadline && new Date(task.deadline) < todayMidnight()) return 'Terlambat'
  return 'Berjalan'
}

// Format ISO date string to locale display
function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

const FILTERS = ['Semua', 'Berjalan', 'Selesai', 'Terlambat']

export default function TaskList({ tasks, onAdd, onToggle, onDelete, search }) {
  const [filter, setFilter] = useState('Semua')
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [titleError, setTitleError] = useState('')

  // Apply filter + search together
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter((t) => {
      const status = getStatus(t)
      const matchFilter = filter === 'Semua' || status === filter
      const matchSearch = !q || t.title.toLowerCase().includes(q)
      return matchFilter && matchSearch
    })
  }, [tasks, filter, search])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError('Judul tugas tidak boleh kosong.')
      return
    }
    setTitleError('')
    onAdd({ title: title.trim(), deadline, done: false })
    setTitle('')
    setDeadline('')
  }

  return (
    <section className="section" aria-labelledby="tugas-heading">
      <h2 className="section__heading" id="tugas-heading">Daftar Tugas</h2>
      <div className="card">

        {/* Filter buttons */}
        <div className="task-toolbar" role="group" aria-label="Filter tugas">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Add task form — title is required, deadline is optional */}
        <form className="add-task-form" onSubmit={handleSubmit} noValidate>
          <div className="add-task-form__row">
            <input
              className={`form-input${titleError ? ' form-input--error' : ''}`}
              type="text"
              placeholder="Judul tugas baru..."
              value={title}
              onChange={(e) => { setTitle(e.target.value); setTitleError('') }}
              aria-label="Judul tugas"
              aria-describedby={titleError ? 'title-error' : undefined}
            />
            <input
              className="form-input"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              aria-label="Tenggat waktu"
            />
            <button type="submit" className="btn-primary">Tambah</button>
          </div>
          {titleError && (
            <p id="title-error" className="form-error" role="alert">{titleError}</p>
          )}
        </form>

        {/* Task rows */}
        {visible.length === 0 ? (
          <p className="task-empty">
            {search ? 'Tidak ada tugas yang cocok.' : 'Belum ada tugas di sini.'}
          </p>
        ) : (
          <ul className="task-list" role="list">
            {visible.map((task) => {
              const status = getStatus(task)
              return (
                <li key={task.id} className="task-item">
                  <input
                    className="task-item__check"
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                    aria-label={`Tandai selesai: ${task.title}`}
                  />
                  <div className="task-item__info">
                    <span className={`task-item__title${task.done ? ' task-item__title--done' : ''}`}>
                      {task.title}
                    </span>
                    {task.deadline && (
                      <span className="task-item__deadline">
                        Tenggat: {fmtDate(task.deadline)}
                      </span>
                    )}
                  </div>
                  <div className="task-item__actions">
                    <span className={
                      `badge badge--${
                        status === 'Selesai' ? 'done'
                        : status === 'Terlambat' ? 'late'
                        : 'progress'
                      }`
                    }>
                      {status}
                    </span>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(task.id)}
                      aria-label={`Hapus tugas: ${task.title}`}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
