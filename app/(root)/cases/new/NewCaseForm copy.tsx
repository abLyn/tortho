'use client'
import ErrorMessege from '@/components/ErrorMessege'

import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import SubmitBtn from './SubmitBtn'
import { useRef } from 'react'
import { z } from 'zod'

import { useToast } from '@/components/ui/use-toast'
import { ClinicalCaseSchema } from '@/app/validationSchemas'

const NewCaseForm = ({ patient }: { patient: Patient }) => {
  const ref = useRef<HTMLFormElement>(null)
  const clientAction = async (formData: FormData) => {
    const newCase = {
      title: formData.get('title'),
      cost: formData.get('cost'),
      patientId: formData.get('patientId'),
    }
    const validation = ClinicalCaseSchema.safeParse(newCase)
    if (!validation.success) {
      let errors = {}

      //await addNewCase(newCase)
    }
  }

  return (
    <>
      <form ref={ref} action={clientAction}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8">
          <Input name="title" type="text" placeholder="titre" required />
          <ErrorMessege>{} </ErrorMessege>
          <Input name="cost" type="number" placeholder="cout" required />
        </div>
        <Input name="patientId" type="hidden" value={patient.id} />
        <DialogFooter className="">
          <SubmitBtn />
        </DialogFooter>
      </form>
    </>
  )
}

export default NewCaseForm
