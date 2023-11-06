import {
  Home,
  Users,
  CalendarDays,
  Banknote,
  Factory,
  Boxes,
  ClipboardEdit,
  LayoutDashboard,
} from 'lucide-react'

export const sidebarLinks = [
  {
    icon: <Home />,
    route: '/',
    label: 'Acceuil',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <LayoutDashboard />,
    route: '/dashboard',
    label: 'Dashboard',
    appearsFor: ['Admin'],
  },
  {
    icon: <Users />,
    route: '/patients',
    label: 'Patients',
    appearsFor: ['Admin', 'Doctor'],
  },
  {
    icon: <CalendarDays />,
    route: '/calendar',
    label: 'Agenda',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <Banknote />,
    route: '#',
    label: 'Finnances',
    appearsFor: ['Admin'],
  },
  {
    icon: <Factory />,
    route: '#',
    label: 'Prothese',
    appearsFor: ['Admin', 'Doctor'],
  },
  {
    icon: <Boxes />,
    route: '#',
    label: 'Stock',
    appearsFor: ['Admin'],
  },
  {
    icon: <ClipboardEdit />,
    route: '#',
    label: 'Notes',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
]
