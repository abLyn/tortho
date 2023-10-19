import Link from 'next/link'

import ProfileButton from './ProfileButton'
import ThemeSwitcherBtn from './ThemeSwitcherBtn'
import Time from './Time'

import SearchBar from '../SearchBar'

const Header = async () => {
  return (
    <header className=" fixed top-0 z-30 flex w-full items-center justify-between  px-6 py-3  bg-slate-200 dark:bg-slate-900">
      <div className="relative px-4 sm:px-6 lg:px-8 flex  items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold transition ease-in-out   hover:scale-105 duration-300  ">
              tootaOrtho
            </h1>
          </Link>
        </div>
        <div className="flex gap-10 items-center ">
          <Time />
        </div>

        <div className="flex items-center  ">
          <SearchBar />

          <ThemeSwitcherBtn />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}

export default Header
