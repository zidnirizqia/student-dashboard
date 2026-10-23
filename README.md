# Dashboard Mahasiswa

Student productivity dashboard built with **React 18 + Vite**. No UI libraries, no routing — plain CSS only.

## Fitur

- **Sidebar** navigasi dengan 4 halaman (Dashboard, Tugas, Jadwal, Profil). Di bawah 768px sidebar menyempit jadi ikon saja.
- **Topbar** dengan judul halaman dinamis dan kotak pencarian yang memfilter daftar tugas secara langsung.
- **KPI Cards** — 3 kartu (Tugas Selesai, Tugas Terlambat, Progres %) dihitung dari state tugas, bukan hardcoded.
- **TaskList** — tambah tugas (judul + tenggat), centang selesai, hapus, filter (Semua / Berjalan / Selesai / Terlambat). Status _Terlambat_ diturunkan otomatis dari tanggal.
- **Schedule** — tab Senin–Jumat, tiap hari menampilkan 2–3 mata kuliah (waktu, nama, ruang).
- **ProfileCard** — avatar inisial CSS, tombol Edit untuk mengubah nama dan semester secara inline.
- **localStorage** — tugas dan profil otomatis tersimpan dan dipulihkan saat halaman di-refresh.

## Cara Menjalankan

```bash
# 1. Masuk ke direktori proyek
cd student-dashboard

# 2. Install dependensi
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk Produksi

```bash
npm run build   # output di dist/
npm run preview # preview hasil build
```

## Struktur Proyek

```
student-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── initialData.js
    └── components/
        ├── Sidebar.jsx
        ├── Topbar.jsx
        ├── KpiCards.jsx
        ├── TaskList.jsx
        ├── Schedule.jsx
        └── ProfileCard.jsx
```
