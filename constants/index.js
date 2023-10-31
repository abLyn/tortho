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
  },
  {
    icon: <LayoutDashboard />,
    route: '/dashboard',
    label: 'Dashboard',
  },
  {
    icon: <Users />,
    route: '/patients',
    label: 'Patients',
  },
  {
    icon: <CalendarDays />,
    route: '/calendar',
    label: 'Agenda',
  },
  {
    icon: <Banknote />,
    route: '#',
    label: 'Finnances',
  },
  {
    icon: <Factory />,
    route: '#',
    label: 'Prothese',
  },
  {
    icon: <Boxes />,
    route: '#',
    label: 'Stock',
  },
  {
    icon: <ClipboardEdit />,
    route: '#',
    label: 'Notes',
  },
]
