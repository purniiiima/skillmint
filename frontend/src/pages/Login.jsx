import React, { useState } from 'react'
import API, { setAuthToken } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      navigate('/dashboard');
    } catch (err) { alert(err.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <input className="w-full p-2 mb-3 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-3 border" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
