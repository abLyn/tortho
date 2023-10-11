'use client'

import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

//-----------------------------------------------------------------------------

const NewPatientPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const createPatient = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/patients', data)

      if (response) {
        toast({
          description: 'Un nouveau patient a ete cree!',
        })
        router.push('/patients')
      }
    } catch (e) {
      // Need to handle this error
      const error = e as AxiosError
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error?.response?.data?.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Créer un patient
      </h1>
      <div className=" m-auto ">
        <form onSubmit={createPatient}>
          <Card className="bg-slate-100 dark:bg-slate-900 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className=" text-2xl font-extrabold  lg:text-3xl mb-3 ">
                Nouveau patient
              </CardTitle>
              <CardDescription>Veuillez remplir le champs</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex gap-2">
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Nom"
                  required
                  value={data.firstname || ''}
                  onChange={handleChange}
                />
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Prenom"
                  required
                  value={data.lastname || ''}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <Button className="w-full" type="submit">
                Creer
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}

export default NewPatientPage
