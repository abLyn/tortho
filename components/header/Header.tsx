import Link from 'next/link'

import { Button } from '../ui/button'

import ProfileButton from './ProfileButton'
import ThemeSwitcherBtn from './ThemeSwitcherBtn'
import { routes } from './routes'

interface Route {
  key: number
  href: string
  label: string
}

const Header = () => {
  return (
    <header className="sm:flex sm:justify-between py-2 px-4  bg-slate-200 dark:bg-slate-900">
      <div className="relative px-4 sm:px-6 lg:px-8 flex  items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold">tootaOrtho</h1>
          </Link>
        </div>
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
        </nav>
        <div className="flex items-center">
          <ThemeSwitcherBtn />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}

export default Header
