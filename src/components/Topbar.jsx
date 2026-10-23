// Topbar — shows the active view title and a live search input.
// The search query is lifted to App so TaskList can filter from it.

// Maps view keys to Indonesian page titles
const VIEW_TITLES = {
  Dashboard: 'Ringkasan Hari Ini',
  Tugas: 'Daftar Tugas',
  Jadwal: 'Jadwal Kuliah',
  Profil: 'Profil Saya',
}

export default function Topbar({ activeView, search, onSearchChange }) {
  return (
    <header className="topbar">
      <h1 className="topbar__title">{VIEW_TITLES[activeView] ?? activeView}</h1>

      <div className="search-wrap">
        {/* Search icon — positioned inside the input via CSS */}
        <svg className="search-wrap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="search-wrap__input"
          type="search"
          placeholder="Cari tugas..."
          aria-label="Cari tugas"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  )
}
