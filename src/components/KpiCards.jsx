// KpiCards — three cards derived entirely from task state.
// No hardcoded numbers; all values recompute via useMemo when tasks change.

import { useMemo } from 'react'

// Returns today at midnight for a consistent comparison baseline
function todayMidnight() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export default function KpiCards({ tasks }) {
  const stats = useMemo(() => {
    const today = todayMidnight()
    const total = tasks.length
    const done = tasks.filter((t) => t.done).length
    const late = tasks.filter(
      (t) => !t.done && t.deadline && new Date(t.deadline) < today
    ).length
    // Progress percentage — avoid division-by-zero on empty list
    const pct = total === 0 ? 0 : Math.round((done / total) * 100)
    // SVG ring: circumference ≈ 2π×13 = 81.68 at r=13 in a 30×30 viewBox
    const circ = 81.68
    const dashFill = (pct / 100) * circ
    return { total, done, late, pct, dashFill, circ }
  }, [tasks])

  return (
    <section className="section" aria-labelledby="kpi-heading">
      <h2 className="section__heading" id="kpi-heading">Statistik Tugas</h2>
      <div className="kpi-grid">

        {/* Card 1: Tugas Selesai — primary metric */}
        <article className="kpi-card kpi-card--primary">
          <div className="kpi-card__top">
            {/* Progress ring encodes the done/total ratio visually */}
            <svg className="kpi-ring" viewBox="0 0 30 30" aria-hidden="true">
              <circle cx="15" cy="15" r="13" className="ring-bg"/>
              <circle
                cx="15" cy="15" r="13"
                className="ring-fill"
                strokeDasharray={`${stats.dashFill} ${stats.circ}`}
              />
            </svg>
            <span className="kpi-card__label">Tugas Selesai</span>
          </div>
          <p className="kpi-card__value">
            {stats.done} <span className="kpi-card__muted">/ {stats.total}</span>
          </p>
          <p className="kpi-card__sub">
            {stats.total - stats.done} tugas tersisa
          </p>
        </article>

        {/* Card 2: Tugas Terlambat — alert metric */}
        <article className="kpi-card kpi-card--late">
          <div className="kpi-card__top">
            <svg className="kpi-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span className="kpi-card__label">Tugas Terlambat</span>
          </div>
          <p className="kpi-card__value">{stats.late}</p>
          <p className="kpi-card__sub">
            {stats.late === 0 ? 'Semua tepat waktu!' : 'Segera selesaikan'}
          </p>
        </article>

        {/* Card 3: Progres — percentage metric, accent color */}
        <article className="kpi-card kpi-card--accent">
          <div className="kpi-card__top">
            <svg className="kpi-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span className="kpi-card__label">Progres</span>
          </div>
          <p className="kpi-card__value">
            {stats.pct}<span className="kpi-card__muted">%</span>
          </p>
          <p className="kpi-card__sub">dari total {stats.total} tugas</p>
        </article>

      </div>
    </section>
  )
}
