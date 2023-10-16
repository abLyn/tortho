'use client'

import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
import { Textarea } from '@/components/ui/textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

//-----------------------------------------------------------------------------

const NewPatientPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: '',
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
      console.log(error)
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
              <div className="flex gap-2">
                <Select name="gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="boy">Masculin</SelectItem>
                      <SelectItem value="girl">Feminin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Telephone"
                  required
                  value={data.phone || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      phone: e.target.value,
                    })
                  }
                />
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  required
                  value={data.email || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2">
                <Textarea
                  name="address"
                  placeholder="Adresse"
                  value={data.address || ''}
                  onChange={handleChange}
                />
                <Textarea
                  name="medicalHistory"
                  placeholder="Antecedents"
                  value={data.medicalHistory || ''}
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
