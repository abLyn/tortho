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

function submitHandler(e: any) {
  e.preventDefault()
  redirect('/patients')
}

const NewPatientPage = () => {
  const router = useRouter()
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Creer un patient
      </h1>
      <div className=" m-auto ">
        <form action={submitHandler}>
          <Card className="bg-slate-100 dark:bg-slate-900 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className=" text-4xl font-extrabold  lg:text-3xl mb-3 required">
                Nouveau patient
              </CardTitle>
              <CardDescription>Veuillez remplir le champs</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex gap-2">
                <Input id="firstname" type="text" placeholder="Nom" />
                <Input id="lastname" type="text" placeholder="Prenom" />
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
