'use client'

import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import SubmitBtn from './SubmitBtn'
import { useRef, useState } from 'react'
import { ClinicalCaseSchema } from '@/app/validationSchemas'

import ErrorMessege from '@/components/ErrorMessege'
import { ZodIssue } from 'zod'

const NewCaseForm = ({ patient }: { patient: Patient }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState([])

  const newCaseClient = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries())

    try {
      const data = ClinicalCaseSchema.parse(formValues)
      const newCase = {
        title: data.title,
        cost: data.cost,
        patientId: data.patientId,
      }
      await addNewCase(newCase)

      ref.current?.reset()
      setErrors([])
    } catch (err: any) {
      setErrors(err.issues)
    }
  }

  function fieldErrorMessage(fieldName: string): string | undefined {
    const errs: ZodIssue[] = errors
    return errs.find((e: any) => e.path[0] === fieldName)?.message
  }

  return (
    <>
      <form ref={ref} action={newCaseClient}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8">
          <div>
            <Input
              name="title"
              type="text"
              placeholder="titre"
              required
              className={fieldErrorMessage('title') && `border-destructive`}
            />
            <ErrorMessege>{fieldErrorMessage('title')}</ErrorMessege>
          </div>
          <div>
            <Input
              name="cost"
              type="number"
              placeholder="cout"
              required
              className={fieldErrorMessage('cost') && `border-destructive`}
            />
            <ErrorMessege>{fieldErrorMessage('cost')}</ErrorMessege>
          </div>
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
