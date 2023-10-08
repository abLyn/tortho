'use client'
import { useState, useEffect } from 'react'

import { signIn, useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const LoginForm = () => {
  const session = useSession()
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    password: '',
  })

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  })
  const loginUser = async (e) => {
    e.preventDefault()
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        //toast.error(callback.error)
      }

      if (callback?.ok && !callback?.error) {
        //toast.success('Logged in successfully!')
      }
    })
  }

  return (
    <form onSubmit={loginUser}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Input
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <span className=" text-slate-500  cursor-pointer  hover:underline text-sm">
          Mot de passe oublie ?
        </span>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </CardFooter>
    </form>
  )
}
export default LoginForm
