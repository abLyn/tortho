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
          (currentPath.includes(link.route) && link.route.length > 1) ||
          currentPath === link.route

        return (
          <Link
            key={link.label}
            href={link.route}
            className={classnames({
              leftsidebar_link: true,
              'bg-background  border-l-8  border-primary': isActive,
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
