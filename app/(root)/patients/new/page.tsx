'use client'

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

import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
//-----------------------------------------------------------------------------

const NewPatientPage = () => {
  const router = useRouter()
  const [data, setdData] = useState({})

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setdData({
      ...data,
      [name]: value,
    })
  }

  const createPatient = (e: any) => {
    e.preventDefault()
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
