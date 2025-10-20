import React, { useState } from 'react'

export default function ContactForm(){
  const [form, setForm] = useState({name:'', email:'', subject:'', message:''})
  const [status, setStatus] = useState(null)

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')
    try{
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      if(res.ok){
        setStatus('sent')
        setForm({name:'', email:'', subject:'', message:''})
      }else{
        setStatus('error')
      }
    }catch(err){
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <button type="submit" className="btn-primary">Send Message</button>
      {status === 'sending' && <p>Sending...</p>}
      {status === 'sent' && <p>Message sent — thank you!</p>}
      {status === 'error' && <p>There was an error sending your message.</p>}
    </form>
  )
}
