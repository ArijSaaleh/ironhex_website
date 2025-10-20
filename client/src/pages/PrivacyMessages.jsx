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
    <div className="content-section">
      <div className="content-wrapper">
        <h2>Private Messages (CEO)</h2>
        <p>This route is unprotected except by the secret token known to CEO. Enter token below.</p>
        <form onSubmit={handleSubmit} style={{marginBottom:20}}>
          <input placeholder="Admin token" value={token} onChange={e=>setToken(e.target.value)} style={{width:'100%',padding:10}} />
          <button className="btn-primary" style={{marginTop:10}}>Load Messages</button>
        </form>

        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Unable to load messages. Check token.</p>}

        {status === 'loaded' && (
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={{borderBottom:'1px solid #ddd',padding:8}}>When</th>
                <th style={{borderBottom:'1px solid #ddd',padding:8}}>From</th>
                <th style={{borderBottom:'1px solid #ddd',padding:8}}>Email</th>
                <th style={{borderBottom:'1px solid #ddd',padding:8}}>Subject</th>
                <th style={{borderBottom:'1px solid #ddd',padding:8}}>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id}>
                  <td style={{padding:8,verticalAlign:'top'}}>{new Date(m.timestamp).toLocaleString()}</td>
                  <td style={{padding:8,verticalAlign:'top'}}>{m.name}</td>
                  <td style={{padding:8,verticalAlign:'top'}}>{m.email}</td>
                  <td style={{padding:8,verticalAlign:'top'}}>{m.subject}</td>
                  <td style={{padding:8,verticalAlign:'top'}}>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
