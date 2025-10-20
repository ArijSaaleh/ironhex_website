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

  const inputClasses = "w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-400 transition-shadow"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input 
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>
      
      <div>
        <input 
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      <div>
        <input 
          name="subject"
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <textarea 
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          rows="4"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {status === 'sent' && (
        <p className="text-green-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Message sent successfully!
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Failed to send message. Please try again.
        </p>
      )}
    </form>
  )
}

