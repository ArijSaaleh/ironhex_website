import React, { useEffect, useState } from 'react'

export default function PrivacyMessages(){
  const [messages, setMessages] = useState([])
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('idle')

  async function fetchMessages(tok){
    setStatus('loading')
    try{
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${tok}` }
      })
      if(res.ok){
        const data = await res.json()
        setMessages(data)
        setStatus('loaded')
      }else{
        setStatus('error')
      }
    }catch(err){
      setStatus('error')
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    fetchMessages(token)
  }

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold">Private Messages (CEO)</h2>
        <p className="mt-2 text-gray-700">This route is unprotected except by the secret token known to CEO. Enter token below.</p>

        <form onSubmit={handleSubmit} className="mt-4 mb-6 flex gap-2">
          <input placeholder="Admin token" value={token} onChange={e=>setToken(e.target.value)} className="flex-1 p-3 border rounded" />
          <button className="px-4 py-2 bg-primary text-white rounded">Load</button>
        </form>

        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p className="text-red-600">Unable to load messages. Check token.</p>}

        {status === 'loaded' && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">When</th>
                  <th className="p-3">From</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(m => (
                  <tr key={m.id} className="align-top border-b">
                    <td className="p-3 align-top">{new Date(m.timestamp).toLocaleString()}</td>
                    <td className="p-3 align-top">{m.name}</td>
                    <td className="p-3 align-top">{m.email}</td>
                    <td className="p-3 align-top">{m.subject}</td>
                    <td className="p-3 align-top">{m.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
