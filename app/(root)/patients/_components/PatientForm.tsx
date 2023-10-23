'use client'
//https://react-hook-form.com/get-started#IntegratingwithUIlibraries

import axios from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

import { useForm, Controller } from 'react-hook-form'
import { createPatientSchema } from '@/app/validationSchemas'
import { Label } from '@/components/ui/label'
import ErrorMessege from '@/components/ErrorMessege'
import Spinner from '@/components/Spinner'
import { UserPlus } from 'lucide-react'
import { Patient } from '@prisma/client'
//-----------------------------------------------------------------------------

type PatientData = z.infer<typeof createPatientSchema>

const PatientForm = ({ patient }: { patient?: Patient }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientData>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {},
  })

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      setSubmitting(true)
      const response = await axios.post('/api/patients', {
        ...data,
      })

      if (response) {
        toast({
          description:
            data.gender === 'Male'
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
  })

  //---------------------------------------------------------------------------------------
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-12">
        Créer un patient
      </h1>
      <div className=" m-auto w-[600px] ">
        <form onSubmit={onSubmit}>
          <Card className="bg-muted/25 p-5 shadow-xl">
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
                    defaultValue={patient?.lastname}
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
                    defaultValue={patient?.firstname}
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
                      <Select
                        defaultValue={patient?.gender}
                        onValueChange={field.onChange}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="---" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Male">Masculin </SelectItem>
                            <SelectItem value="Female">Feminin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessege> {errors.gender?.message}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="lastname">Date de naissance*</Label>
                  <Input
                    type="date"
                    defaultValue={patient?.dob}
                    required
                    {...register('dob')}
                  />
                  <ErrorMessege> {errors.dob?.message}</ErrorMessege>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[100%]">
                  <Label htmlFor="phone">Telephone*</Label>
                  <Input
                    type="number"
                    defaultValue={patient?.phone}
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
                    defaultValue={patient?.email!}
                    placeholder="email"
                    {...register('email')}
                  />
                  <ErrorMessege> {errors.email?.message}</ErrorMessege>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[100%]">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    placeholder="Adresse"
                    defaultValue={patient?.address}
                    {...register('address')}
                  />

                  <ErrorMessege> {errors.lastname?.address}</ErrorMessege>
                </div>
                <div className="w-[100%]">
                  <Label htmlFor="medicalHistory">Antecedents</Label>
                  <Textarea
                    placeholder="Antecedents"
                    defaultValue={patient?.medicalHistory!}
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
                <UserPlus />
                Creer {isSubmitting && <Spinner />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}

export default PatientForm