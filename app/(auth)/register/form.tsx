'use client'

import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const RegisterForm = (req: NextApiRequest, res: NextApiResponse) => {
  const router = useRouter()
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

    try {
      const response = await axios.post('/api/register', data)

      if (response) {
        toast({
          description: 'User has been registered!',
        })
        router.push('/login')
      }
    } catch (e) {
      // Need to handle this error
      const error = e as AxiosError
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error?.response?.data?.error,
        action: (
          <ToastAction
            onClick={() =>
              setData({
                name: '',
                password: '',
              })
            }
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      })
    }
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
