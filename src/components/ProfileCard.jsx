// ProfileCard — shows student info with an inline edit form.
// Edit toggled by a button; changes are lifted to App and persisted to localStorage.

import { useState } from 'react'

// Derive initials from a full name (up to 2 characters)
function initials(name) {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default function ProfileCard({ profile, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(profile.name)
  const [draftSemester, setDraftSemester] = useState(profile.semester)

  function handleEdit() {
    // Reset draft to current profile values before opening the form
    setDraftName(profile.name)
    setDraftSemester(profile.semester)
    setEditing(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!draftName.trim()) return
    onSave({ ...profile, name: draftName.trim(), semester: Number(draftSemester) })
    setEditing(false)
  }

  function handleCancel() {
    setEditing(false)
  }

  return (
    <section className="section" aria-labelledby="profil-heading">
      <h2 className="section__heading" id="profil-heading">Profil Mahasiswa</h2>
      <div className="card profile-card">

        {/* CSS circle avatar with initials */}
        <div className="profile-avatar" aria-label={`Avatar ${profile.name}`}>
          {initials(profile.name)}
        </div>

        <div className="profile-info">
          {editing ? (
            /* Inline edit form */
            <form className="profile-edit-form" onSubmit={handleSave} noValidate>
              <label className="profile-edit-form__label">
                Nama lengkap
                <input
                  className="form-input"
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  required
                  aria-label="Nama lengkap"
                />
              </label>
              <label className="profile-edit-form__label">
                Semester
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  max="14"
                  value={draftSemester}
                  onChange={(e) => setDraftSemester(e.target.value)}
                  aria-label="Semester"
                />
              </label>
              <div className="profile-edit-form__actions">
                <button type="submit" className="btn-primary">Simpan</button>
                <button type="button" className="btn-secondary" onClick={handleCancel}>Batal</button>
              </div>
            </form>
          ) : (
            /* Display mode */
            <>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-major">{profile.major}</p>
              <div className="profile-meta">
                <span className="profile-badge">Semester {profile.semester}</span>
                <span className="profile-badge profile-badge--alt">NIM {profile.nim}</span>
              </div>
              <button className="btn-edit" onClick={handleEdit} aria-label="Edit profil">
                Edit Profil
              </button>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
