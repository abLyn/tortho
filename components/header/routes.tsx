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

/*-----------------------------------------------------------------------------------------

import { routes } from './routes'

<nav className="mx-6 flex items-center space-x-4 lg:space-x-6 ">
          {routes.map((route: Route) => (
            <Button key={route.key} asChild variant="ghost">
              <Link
                href={route.href}
                className="text-sm font-medium transition-colors"
              >
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>*/
