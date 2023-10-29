import { Calendar } from '@/components/ui/calendar'

const Appointments = () => {
  return (
    <div>
      <h1 className="text-xl text-primary font-semibold mb-10">Rendez-vous</h1>

      <Calendar
        mode="single"
        selected={new Date()}
        className="rounded-md border"
      />
    </div>
  )
}

export default Appointments
