'use client'
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import frLocale from '@fullcalendar/core/locales/fr'

const LargeCalendar = () => {
  const handleDateClick = (arg: any) => {}
  const rdv = [
    { title: 'moussa', date: '2023-10-01' },
    { title: 'toufik', date: '2023-10-16' },
    {
      title: 'kaddour',
      start: '2023-10-12T10:30:00',
      end: '2023-10-12T11:30:00',
      extendedProps: {
        department: 'BioChemistry',
      },
      description: 'Lecture',
    },
  ]
  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      // locale={frLocale}
      timeZone="local"
      droppable={true}
      selectable={true}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      navLinks={true}
      editable={true}
      selectMirror={true}
      dayMaxEvents={true}
      dateClick={handleDateClick}
      events={rdv}
      // eventContent={renderEventContent}
    />
  )
}

export default LargeCalendar
