'use client'
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { EventDragStartArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import frLocale from '@fullcalendar/core/locales/fr'
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Appointment } from '@prisma/client'
import axios from 'axios'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventChangeArg,
} from '@fullcalendar/core'
import { useRouter } from 'next/navigation'

const LargeCalendar = ({ appointments }: { appointments: Appointment[] }) => {
  const router = useRouter()

  const handleDateSelect = async (selected: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selected.view.calendar
    calendarApi.unselect()

    if (title) {
      const data = {
        title: title,
        start: selected.start,
        end: selected.end,
      }

      await axios.post('/api/appointments/', data)
      router.refresh()
    }
  }
  const handleEventClick = async (selected: EventClickArg) => {
    const appointmentId = selected.event._def.publicId
    if (
      window.confirm(
        `Voulez vous vraiment supprimer ce rendez-vous? '${selected.event.title}'`
      )
    ) {
      await axios.delete('/api/appointments/' + appointmentId)
      selected.event.remove()
    }
  }

  const handleEventChange = async (selected: EventChangeArg) => {
    const appointmentId = selected.event._def.publicId
    const data = {
      newStart: selected.event._instance?.range.start,
      newEnd: selected.event._instance?.range.end,
    }

    await axios.patch('/api/appointments/' + appointmentId, data)
  }

  return (
    <FullCalendar
      height="75vh"
      plugins={[
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        multiMonthPlugin,
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      initialView="dayGridMonth"
      multiMonthMaxColumns={3}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      firstDay={6}
      locale={frLocale}
      timeZone="UTC"
      //droppable={true}
      navLinks={true}
      nowIndicator={true}
      //dateClick={handleDateClick}
      events={appointments}
      select={handleDateSelect}
      eventClick={handleEventClick}
      eventChange={handleEventChange}

      // eventContent={renderEventContent}
    />
  )
}

export default LargeCalendar
