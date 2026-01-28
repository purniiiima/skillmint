import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetail'
import ChatWindow from './components/ChatWindow'

// Import toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App(){
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-indigo-600">SkillMint</Link>
          <div className="flex gap-3">
            <Link to="/profile">Profile</Link>
            <Link to="/login" className="px-3 py-1">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded">Sign up</Link>
          </div>
        </div>
      </nav>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/projects/:id" element={<ProjectDetail/>} />
        <Route path="/chat/:chatId" element={
          <div className='p-6'>
            <ChatWindow chatId={window.location.pathname.split('/').pop()} currentUser={null} />
          </div>
        } />
      </Routes>
    </div>
  )
}
