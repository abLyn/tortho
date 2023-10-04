'use client'
import { sidebarLinks } from '@/constants'
import Icon from '@/providers/Icons'

import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <section className="  sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r-slate-900   pb-5 pt-28 bg-slate-200 dark:bg-slate-900 custom-scrollbar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link  ${
                isActive && 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              <Icon name={link.icon} />
              <p className="text-light-2 max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
