import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import API from '../services/api'

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5100')

export default function ChatWindow({ chatId, currentUser }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    if(!chatId) return;
    socket.emit('join', { chatId });
    socket.on('receiveMessage', msg => setMessages(m => [...m, msg]));
    return ()=> socket.off('receiveMessage');
  }, [chatId]);

  useEffect(()=> {
    // fetch last messages from server (not implemented server-side list, so skip)
  }, [chatId]);

  const send = () => {
    if(!text) return;
    const message = { chatId, content: text, sender: currentUser?.id || null, createdAt: new Date().toISOString() }
    socket.emit('sendMessage', { chatId, message })
    setMessages(m => [...m, message])
    setText('')
  }

  return (
    <div className="border rounded p-3 bg-white">
      <div className="h-56 overflow-auto mb-3">
        {messages.map((m,i)=>(
          <div key={i} className={`mb-2 ${m.sender === currentUser?.id ? 'text-right' : 'text-left'}`}>
            <div className="inline-block p-2 rounded shadow-sm bg-gray-100">{m.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Write a message..." />
        <button onClick={send} className="px-3 py-1 bg-indigo-600 text-white rounded">Send</button>
      </div>
    </div>
  )
}
