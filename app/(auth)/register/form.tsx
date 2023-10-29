'use client'

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { UserSchema } from '@/app/validationSchemas'
import ErrorMessege from '@/components/ErrorMessege'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import Spinner from '@/components/Spinner'

type UserData = z.infer<typeof UserSchema>

const RegisterForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {},
  })

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      setSubmitting(true)
      const response = await axios.post('/api/register', data)

      if (response) {
        toast({
          description: 'User has been registered!',
        })
        router.push('/login')
      }
    } catch (e) {
      setSubmitting(false)
      setError('An unexpected error occured!')

      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Input
            type="text"
            placeholder="Nom d'utilisateur"
            required
            {...register('name')}
          />
          <ErrorMessege> {errors.name?.message}</ErrorMessege>
        </div>

        <div className="grid gap-2">
          <Input
            type="password"
            placeholder="Mot de passe"
            required
            {...register('password')}
          />
          <ErrorMessege> {errors.password?.message}</ErrorMessege>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          S&apos;inscrire {isSubmitting && <Spinner />}
        </Button>
      </CardFooter>
    </form>
  )
}
export default RegisterForm
