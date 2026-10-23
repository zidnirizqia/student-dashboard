// Sample data seeded on first load.
// Deadlines are computed relative to today so the "Terlambat" status
// is always realistic regardless of when the app is opened.

const today = new Date()

// Helper: returns an ISO date string offset by `days` from today
function offsetDate(days) {
  const d = new Date(today)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

// Initial task list — 5 items, at least 2 deadlines in the past
export const initialTasks = [
  {
    id: 1,
    title: 'Laporan Praktikum Kimia',
    deadline: offsetDate(-3),   // 3 days ago → Terlambat if not done
    done: false,
  },
  {
    id: 2,
    title: 'Makalah Filsafat Ilmu',
    deadline: offsetDate(4),    // 4 days ahead → Berjalan
    done: false,
  },
  {
    id: 3,
    title: 'Soal Latihan Kalkulus',
    deadline: offsetDate(-1),   // yesterday → Terlambat if not done
    done: false,
  },
  {
    id: 4,
    title: 'Resume Bab 4 Akuntansi',
    deadline: offsetDate(2),    // 2 days ahead → Selesai
    done: true,
  },
  {
    id: 5,
    title: 'Presentasi Kelompok Sosiologi',
    deadline: offsetDate(7),    // 1 week ahead → Berjalan
    done: false,
  },
]

// Weekly schedule — keyed by short day name matching the tab labels
export const scheduleData = {
  Senin: [
    { time: '08.00', name: 'Kimia Dasar', room: 'Lab A-201' },
    { time: '10.00', name: 'Matematika II', room: 'Gd. B Lt. 3' },
    { time: '13.00', name: 'Bahasa Indonesia', room: 'Aula Timur' },
  ],
  Selasa: [
    { time: '09.00', name: 'Pengantar Akuntansi', room: 'Gd. C-102' },
    { time: '11.00', name: 'Fisika Dasar', room: 'Lab Fisika' },
  ],
  Rabu: [
    { time: '08.00', name: 'Sosiologi Umum', room: 'Gd. A-305' },
    { time: '10.00', name: 'Matematika II', room: 'Gd. B Lt. 3' },
    { time: '13.00', name: 'Filsafat Ilmu', room: 'Aula Barat' },
  ],
  Kamis: [
    { time: '07.00', name: 'Kimia Dasar (Praktikum)', room: 'Lab A-201' },
    { time: '13.00', name: 'Bahasa Inggris', room: 'Gd. D-110' },
  ],
  Jumat: [
    { time: '08.00', name: 'Pengantar Akuntansi', room: 'Gd. C-102' },
    { time: '10.00', name: 'Fisika Dasar', room: 'Lab Fisika' },
  ],
}

// Default profile
export const initialProfile = {
  name: 'Rizky Ardianto',
  major: 'Teknik Informatika',
  nim: '2210511042',
  semester: 4,
}
