'use client'

import { PaymentSchema } from '@/app/validationSchemas'
import ErrorMessege from '@/components/ErrorMessege'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { ClinicalCase } from '@prisma/client'

type PaymentData = z.infer<typeof PaymentSchema>

const PaymentForm = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  console.log(patientCases)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {},
  })

  const onSubmit = handleSubmit(async (data: PaymentData) => {
    try {
      setSubmitting(true)
      const response = await axios.post('/api/payments', data)

      if (response) {
        toast({
          description: 'Versement effectue avec succes!',
        })
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
    <div className=" m-auto w-[600px] ">
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-4">
          <div className="w-[100%]">
            <Label htmlFor="clinicalCase">Cas cliniques</Label>
            <Controller
              name="clinicalCaseId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue="---"
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {patientCases.map((cas) => (
                        <SelectItem key={cas.id} value={cas.id}>
                          {cas.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Input
              type="number"
              placeholder="cout"
              required
              {...register('value')}
            />
            <ErrorMessege> {errors.value?.message}</ErrorMessege>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            Créer {isSubmitting && <Spinner />}
          </Button>
        </CardFooter>
      </form>
    </div>
  )
}

export default PaymentForm
