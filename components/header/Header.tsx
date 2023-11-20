import Link from 'next/link'

import ProfileButton from './ProfileButton'
import ThemeSwitcherBtn from './ThemeSwitcherBtn'
import Time from './Time'

import SearchBar from '../SearchBar'

const Header = async ({ query }: { query: string }) => {
  return (
    <header className=" fixed top-0 z-30 flex w-full items-center justify-between px-4 lg:px-10 py-3   bg-slate-200 dark:bg-slate-900">
      <div className="relative  flex  items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className=" lg:ml-0   ">
            <h1 className="  flex items-end  group text-2xl font-bold transition ease-in-out   hover:scale-105 duration-300  ">
              toota
              <span className=" text-primary text-3xl  animate-bounce    ">
                O
              </span>
              rtho
            </h1>
          </Link>
        </div>
        <Time />

        <div className="flex items-center  ">
          <ThemeSwitcherBtn />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}

export default Header
