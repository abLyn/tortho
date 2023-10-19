import { Home, Users, UserPlus, CalendarDays } from 'lucide-react'

export const sidebarLinks = [
  {
    icon: <Home />,
    route: '/',
    label: 'Acceuil',
  },
  {
    icon: <Users />,
    route: '/patients',
    label: 'Patients',
  },
  {
    icon: <UserPlus />,
    route: '/patients/new',
    label: 'Creer un patient',
  },
  {
    icon: <CalendarDays />,
    route: '/calendar',
    label: 'Calendrier',
  },
]
