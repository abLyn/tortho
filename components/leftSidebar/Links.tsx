'use client'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
const Links = () => {
  const currentPath = usePathname()
  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
      {sidebarLinks.map((link) => {
        const isActive =
          //(pathname.includes(link.route) && link.route.length > 1) ||
          currentPath === link.route
        return (
          <Link
            key={link.label}
            href={link.route}
            //className={`leftsidebar_link ${isActive && 'bg-muted '}`}
            className={classnames({
              leftsidebar_link: true,
              'bg-muted ': isActive,
            })}
          >
            {link.icon}

            <p className=" max-lg:hidden">{link.label}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Links
