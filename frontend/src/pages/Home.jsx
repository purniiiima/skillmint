import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [projects, setProjects] = useState([])

  useEffect(()=>{ fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) { console.error(err) }
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Open Projects</h1>
        <Link to="/dashboard" className="px-3 py-1 bg-indigo-600 text-white rounded">Dashboard</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm mt-2">{p.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs">{p.requiredSkills?.slice(0,3).join(', ')}</div>
              <Link to={`/dashboard`} className="text-indigo-600 text-sm">Apply</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
