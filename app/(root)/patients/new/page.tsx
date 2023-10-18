'use client'
//https://react-hook-form.com/get-started#IntegratingwithUIlibraries
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
import { revalidatePath } from 'next/cache'

import { useForm, Controller } from 'react-hook-form'
import { createPatientSchema } from '@/app/validationSchemas'
//-----------------------------------------------------------------------------

type NewPatientForm = z.infer<typeof createPatientSchema>

const NewPatientPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPatientForm>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {},
  })

  const createPatient = async (data: any) => {
    try {
      const response = await axios.post('/api/patients', {
        ...data,
        image: data.gender === 'boy' ? '/public/boy.svg' : '/public/girl.svg',
      })

      if (response) {
        toast({
          description: 'Un nouveau patient a ete cree!',
        })
        router.push('/patients/' + response.data.id)
      }
    } catch (e) {
      // Need to handle this error
      setError('An unexpected error occured!')

      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  //---------------------------------------------------------------------------------------
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Créer un patient
      </h1>
      <div className=" m-auto ">
        <form
          onSubmit={handleSubmit((data) => {
            createPatient(data)
          })}
        >
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
                  type="text"
                  placeholder="Nom"
                  required
                  {...register('firstname')}
                />

                <Input
                  type="text"
                  placeholder="Prenom"
                  required
                  {...register('lastname')}
                />
              </div>
              <div className="flex gap-2">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sexe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="boy">Masculin </SelectItem>
                          <SelectItem value="girl">Feminin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />

                <Input type="date" required {...register('dob')} />
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Telephone"
                  required
                  {...register('phone')}
                />
                <Input
                  type="text"
                  placeholder="email"
                  required
                  {...register('email')}
                />
              </div>
              <div className="flex gap-2">
                <Textarea placeholder="Adresse" {...register('address')} />
                <Textarea
                  placeholder="Antecedents"
                  {...register('medicalHistory')}
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
