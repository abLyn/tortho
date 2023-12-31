'use client'
import './c.css'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

const CCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border w-fit"
    />
  )
}

export default CCalendar
