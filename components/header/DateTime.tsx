'use client'

import { useState, useEffect } from 'react'

export const DateTime = () => {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 10000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <div className=" flex text-center gap-10 text-4xl font-thin">
      <p>
        {date.getHours()}
        <span className="text-xl"> {date.getMinutes()}</span>
      </p>
    </div>
  )
}

export default DateTime

/*------------------------------------------------------------------------
  const monthes = [
    'jan',
    'fev',
    'mars',
    'avr',
    'mai',
    'juin',
    'juil',
    'aout',
    'sept',
    'oct',
    'nov',
    'dec',
  ]
  <p className="text-sm">
        {date.getDate()} {monthes[date.getMonth()]} {date.getFullYear()}
      </p>
  <p> {date.toLocaleDateString()}</p>
  */
