import React, { useEffect, useState } from 'react'
import API, { setAuthToken } from '../services/api'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatarUrl: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/me')
      setProfile(res.data)
      setForm({
        name: res.data.name || '',
        email: res.data.email || '',
        bio: res.data.bio || '',
        avatarUrl: res.data.avatarUrl || '',
        password: ''
      })
    } catch (err) {
      console.error(err)
      alert('Failed to load profile')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const save = async () => {
    try {
      setLoading(true)

      const updates = {
        name: form.name,
        email: form.email,
        bio: form.bio,
        avatarUrl: form.avatarUrl
      }

      if (form.password) {
        updates.password = form.password
      }

      const res = await API.put('/users/me', updates)
      setProfile(res.data)
      setForm({ ...form, password: '' })

      alert('✅ Profile updated successfully')
    } catch (err) {
      console.error(err)
      alert('❌ Update failed')
    } finally {
      setLoading(false)
    }
  }

  // ✅ CLOUDINARY IMAGE UPLOAD
  const onFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const cloudName = "YOUR_CLOUD_NAME"
    const uploadPreset = "YOUR_UNSIGNED_PRESET"

    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', uploadPreset)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: fd
      })

      const data = await res.json()
      setForm({ ...form, avatarUrl: data.secure_url })
      alert('✅ Image uploaded — now save profile')
    } catch (err) {
      console.error(err)
      alert('❌ Upload failed')
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex gap-4 items-center">
          <img
            src={form.avatarUrl || '/placeholder-avatar.png'}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <div className="font-semibold">{profile?.name}</div>
            <div className="text-sm text-gray-600">{profile?.email}</div>
          </div>
        </div>

        {/* NAME */}
        <div className="mt-4">
          <label className="text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border mt-1 rounded"
          />
        </div>

        {/* EMAIL */}
        <div className="mt-3">
          <label className="text-sm">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border mt-1 rounded"
          />
        </div>

        {/* PASSWORD */}
        <div className="mt-3">
          <label className="text-sm">New Password (optional)</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border mt-1 rounded"
          />
        </div>

        {/* BIO */}
        <div className="mt-3">
          <label className="text-sm">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 border mt-1 rounded"
          />
        </div>

        {/* AVATAR */}
        <div className="mt-3">
          <label className="text-sm">Avatar Image</label>
          <input type="file" onChange={onFile} className="block mt-1" />
          <div className="text-xs mt-1 text-gray-500">
            Upload image to Cloudinary
          </div>
        </div>

        <button
          onClick={save}
          disabled={loading}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
