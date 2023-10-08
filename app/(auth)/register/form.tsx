'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import prisma from '@/prisma/PrismaClient'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const RegisterForm = (req: NextApiRequest, res: NextApiResponse) => {
  const { toast } = useToast()
  const [data, setData] = useState({
    name: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const registerUser = async (e: any) => {
    e.preventDefault()
    axios
      .post('/api/register', data)
      .then(() =>
        toast({
          description: 'User has been registered!',
        })
      )
      .catch(() =>
        toast({
          variant: 'destructive',
          title: 'Something went wrong!',
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      )
  }

  return (
    <form onSubmit={registerUser}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Input
            name="name"
            value={data.name}
            onChange={handleChange}
            type="text"
            placeholder="Nom d'utilisateur"
            required
          />
        </div>

        <div className="grid gap-2">
          <Input
            name="password"
            value={data.password}
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <Button type="submit" className="w-full">
          S&apos;inscrire
        </Button>
      </CardFooter>
    </form>
  )
}
export default RegisterForm
