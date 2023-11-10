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
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <Users />,
    route: '/patients',
    label: 'Patients',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
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
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <Factory />,
    route: '#',
    label: 'Prothese',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <Boxes />,
    route: '#',
    label: 'Stock',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
  {
    icon: <ClipboardEdit />,
    route: '#',
    label: 'Notes',
    appearsFor: ['Admin', 'Doctor', 'Assistant'],
  },
]

export const treatments = []
