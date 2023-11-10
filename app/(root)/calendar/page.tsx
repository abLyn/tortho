import prisma from '@/prisma/PrismaClient'
import LargeCalendar from './LargeCalendar'

const Calendar = async () => {
  const appointments = await prisma.appointment.findMany()

  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Calendrier
      </h1>

      <LargeCalendar appointments={appointments} />
    </>
  )
}

export default Calendar
