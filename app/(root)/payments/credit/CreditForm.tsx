'use client'
import { CreditSchema } from '@/app/validationSchemas'
import ErrorMessege from '@/components/ErrorMessege'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { increaseCredit } from '@/lib/actions'
import { useRef, useState } from 'react'
import { ZodIssue } from 'zod'
import SubmitCreditBtn from './SubmitCreditBtn'

const CreditForm = ({ patientId }: { patientId: string }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState([])

  const increaseCreditClient = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries())

    try {
      const data = CreditSchema.parse(formValues)
      const newMount = {
        mount: data.mount,
        patientId: data.patientId,
      }
      await increaseCredit(newMount)

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
      <form ref={ref} action={increaseCreditClient}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8 ">
          <Input
            name="mount"
            type="number"
            placeholder="montant à versé"
            required
            className={fieldErrorMessage('mount') && `border-destructive`}
          />
          <ErrorMessege>{fieldErrorMessage('mount')}</ErrorMessege>
        </div>
        <Input name="patientId" type="hidden" value={patientId} />

        <DialogFooter className="mt-10">
          <SubmitCreditBtn />
        </DialogFooter>
      </form>
    </>
  )
}

export default CreditForm
