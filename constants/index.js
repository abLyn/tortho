import { Home, Users, CalendarDays } from 'lucide-react'

export const sidebarLinks = [
  {
    icon: <Home />,
    route: '#',
    label: 'Acceuil',
  },
  {
    icon: <Users />,
    route: '/patients',
    label: 'Patients',
  },
  {
    icon: <CalendarDays />,
    route: '#',
    label: 'Calendrier',
  },
]
