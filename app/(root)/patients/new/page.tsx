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
import { Label } from '@/components/ui/label'
import ErrorMessege from '@/components/ErrorMessege'
import Spinner from '@/components/Spinner'
//-----------------------------------------------------------------------------

type NewPatientForm = z.infer<typeof createPatientSchema>

const NewPatientPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

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
      setSubmitting(true)
      const response = await axios.post('/api/patients', {
        ...data,
        image: data.gender === 'boy' ? '/assets/man.svg' : '/assets/woman.svg',
      })

      if (response) {
        toast({
          description:
            data.gender === 'boy'
              ? 'Un nouveau patient a ete créé!'
              : 'Une nouvelle patiente a ete créée!',
        })
        router.push('/patients/' + response.data.id)
      }
    } catch (e) {
      // Need to handle this error
      setSubmitting(false)
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
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-12">
        Créer un patient
      </h1>
      <div className=" m-auto w-[800px] ">
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
              <div className="flex gap-2 ">
                <div className="w-[100%]">
                  <Label htmlFor="lastname">Nom*</Label>
                  <Input
                    type="text"
                    placeholder="Nom"
                    required
                    {...register('lastname')}
                  />
                  <ErrorMessege> {errors.lastname?.message}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="firstname">Prenom*</Label>
                  <Input
                    type="text"
                    placeholder="Prenom"
                    required
                    {...register('firstname')}
                  />
                  <ErrorMessege> {errors.firstname?.message}</ErrorMessege>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[100%]">
                  <Label htmlFor="gender">Sexe*</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="--------------------" />
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
                  <ErrorMessege> {errors.gender?.message}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="lastname">Date de naissance*</Label>
                  <Input type="date" required {...register('dob')} />
                  <ErrorMessege> {errors.dob?.message}</ErrorMessege>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[100%]">
                  <Label htmlFor="phone">Telephone*</Label>
                  <Input
                    type="number"
                    placeholder="Telephone"
                    required
                    {...register('phone')}
                  />
                  <ErrorMessege> {errors.phone?.message}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    placeholder="email"
                    {...register('email')}
                  />
                  <ErrorMessege> {errors.email?.message}</ErrorMessege>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[100%]">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea placeholder="Adresse" {...register('address')} />

                  <ErrorMessege> {errors.lastname?.address}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="medicalHistory">Antecedents</Label>
                  <Textarea
                    placeholder="Antecedents"
                    {...register('medicalHistory')}
                  />
                  <ErrorMessege>
                    {' '}
                    {errors.lastname?.medicalHistory}
                  </ErrorMessege>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <Button
                className="w-full gap-5"
                type="submit"
                disabled={isSubmitting}
              >
                Creer {isSubmitting && <Spinner />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}

export default NewPatientPage
