// Sidebar navigation — switching active view is handled by App state.
// Each nav item is a <button> (not a link) because there's no real URL change.

// Inline SVG icons — relevant to each nav item, no external icon library
const icons = {
  Dashboard: (
    <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Tugas: (
    <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  Jadwal: (
    <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Profil: (
    <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
}

const NAV_ITEMS = ['Dashboard', 'Tugas', 'Jadwal', 'Profil']

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Navigasi utama">
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">SM</div>
        <span className="sidebar__brand-name">StudiMaju</span>
      </div>

      <ul className="sidebar__nav" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <button
              className={`sidebar__btn${activeView === item ? ' sidebar__btn--active' : ''}`}
              onClick={() => onNavigate(item)}
              aria-current={activeView === item ? 'page' : undefined}
              title={item}
            >
              {icons[item]}
              <span className="sidebar__label">{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
