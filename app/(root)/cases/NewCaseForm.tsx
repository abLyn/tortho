'use client'

import { ClinicalCaseSchema } from '@/app/validationSchemas'
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
import { useForm } from 'react-hook-form'

import { z } from 'zod'

type ClinicalCaseData = z.infer<typeof ClinicalCaseSchema>

const NewCaseForm = ({ patientId }: { patientId: string }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClinicalCaseData>({
    resolver: zodResolver(ClinicalCaseSchema),
    defaultValues: { patientId: patientId },
  })

  const onSubmit = handleSubmit(async (data: ClinicalCaseData) => {
    try {
      setSubmitting(true)
      const response = await axios.post('/api/cases', data)

      if (response) {
        toast({
          description: 'Case has been added!',
        })
      }
      router.push('/patients/' + patientId)
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
          <div className="grid gap-2">
            <Input
              type="text"
              placeholder="title"
              required
              {...register('title')}
            />
            <ErrorMessege> {errors.title?.message}</ErrorMessege>
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

export default NewCaseForm
