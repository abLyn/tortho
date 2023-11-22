'use client'

import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import SubmitBtn from './SubmitBtn'
import { useRef } from 'react'
import { ClinicalCaseSchema } from '@/app/validationSchemas'

const NewCaseForm = ({ patient }: { patient: Patient }) => {
  const ref = useRef<HTMLFormElement>(null)
  const newCaseClient = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries())

    //const data = ClinicalCaseSchema.parse(formValues)
    const dataValidation = ClinicalCaseSchema.safeParse(formValues)
    if (!dataValidation.success) {
      const errors = dataValidation.error.issues

      console.log(errors)
    } else {
      const data = ClinicalCaseSchema.parse(formValues)
      const newCase = {
        title: data.title,
        cost: data.cost,
        patientId: data.patientId,
      }
      await addNewCase(newCase)
      ref.current?.reset()
    }
  }
  return (
    <>
      <form ref={ref} action={newCaseClient}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8">
          <Input name="title" type="text" placeholder="titre" required />
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
