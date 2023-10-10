'use client'

import { useState, useEffect } from 'react'

export const Time = () => {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 10000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <p className=" text-4xl">
      {date.getHours()}
      <span className="text-xl"> {date.getMinutes()}</span>
    </p>
  )
}

export default Time
