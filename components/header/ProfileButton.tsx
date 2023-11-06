import { Settings, User, UserPlus, UserPlus2 } from 'lucide-react'
import { getServerSession } from 'next-auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import SignOutBtn from './SignOutBtn'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import Link from 'next/link'

const ProfileButton = async () => {
  const session = await getServerSession(authOptions)
  const username = session?.user?.name

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="text-xl text-bold">
            {username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4 cursor-pointer" />

          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4 cursor-pointer" />
          <span>Settings</span>
        </DropdownMenuItem>
        {session?.user.role === 'Admin' && (
          <DropdownMenuItem>
            <Link href={'/register'} className="flex">
              <UserPlus className="mr-2 h-4 w-4 cursor-pointer" />
              <span>New user</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <SignOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
