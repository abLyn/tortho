'use client'

import { useState, useEffect } from 'react'

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

export const Today = () => {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 10000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <p className=" text-4xl ml-5">
      {date.getDate()}
      <span className="text-xl"> {monthes[date.getMonth()]}</span>
    </p>
  )
}

export default Today
