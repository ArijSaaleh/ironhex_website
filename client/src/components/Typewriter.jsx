import React, { useEffect, useState } from 'react'

export default function Typewriter({ text = '', speed = 60, className = '' }){
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let idx = 0
    setDisplay('')
    const t = setInterval(() => {
      idx++
      setDisplay(text.slice(0, idx))
      if (idx >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])

  return (
    <span className={`typewriter ${display.length === text.length ? 'blink' : ''} ${className}`}>{display}</span>
  )
}
