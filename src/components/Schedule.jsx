// Schedule — tab-per-day view of the weekly timetable.
// Clicking a day tab swaps the course list for that day.

import { useState } from 'react'
import { scheduleData } from '../data/initialData'

const DAYS = Object.keys(scheduleData) // ['Senin','Selasa','Rabu','Kamis','Jumat']

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(DAYS[0])

  const courses = scheduleData[activeDay] ?? []

  return (
    <section className="section" aria-labelledby="jadwal-heading">
      <h2 className="section__heading" id="jadwal-heading">Jadwal Kuliah</h2>
      <div className="card">

        {/* Day tabs */}
        <div className="schedule-tabs" role="tablist" aria-label="Hari kuliah">
          {DAYS.map((day) => (
            <button
              key={day}
              role="tab"
              className={`tab-btn${activeDay === day ? ' tab-btn--active' : ''}`}
              aria-selected={activeDay === day}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Course list for the active day */}
        <ul
          className="schedule-courses"
          role="tabpanel"
          aria-label={`Jadwal ${activeDay}`}
        >
          {courses.map((c, i) => (
            <li key={i} className="course-row">
              <span className="course-row__time">{c.time}</span>
              <span className="course-row__name">{c.name}</span>
              <span className="course-row__room">{c.room}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
