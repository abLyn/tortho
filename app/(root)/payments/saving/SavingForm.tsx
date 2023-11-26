'use client'
import { PatientSchema } from '@/app/validationSchemas'
import ErrorMessege from '@/components/ErrorMessege'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { addNewSaving } from '@/lib/actions'
import { useRef, useState } from 'react'
import { ZodIssue } from 'zod'
import SubmitSavingBtn from './SubmitSavingBtn'
import { Patient } from '@prisma/client'

const SavingForm = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState([])

  const newSavingClient = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries())

    try {
      const data = PatientSchema.parse(formValues)
      const newSaving = {
        saving: data.saving,
      }
      await addNewSaving(newSaving)

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
      <form ref={ref} action={newSavingClient}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8 ">
          <Input
            name="saving"
            type="number"
            placeholder="montant à versé"
            required
            className={fieldErrorMessage('saving') && `border-destructive`}
          />
          <ErrorMessege>{fieldErrorMessage('saving')}</ErrorMessege>
        </div>

        <DialogFooter className="mt-10">
          <SubmitSavingBtn />
        </DialogFooter>
      </form>
    </>
  )
}

export default SavingForm
