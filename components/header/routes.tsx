interface Route {
  key: number
  href: string
  label: string
}

export const routes: Route[] = [
  { key: 1, href: '/', label: 'Patients' },
  { key: 2, href: '/', label: 'Calendrier' },
  { key: 3, href: '/', label: 'En Attente' },
]
