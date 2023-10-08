'use client'

import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
const SignOutBtn = () => {
  function signOutHandler() {
    signOut()
  }
  return (
    <DropdownMenuItem onClick={() => signOutHandler()}>
      <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
      <span>Log Out</span>
    </DropdownMenuItem>
  )
}

export default SignOutBtn
