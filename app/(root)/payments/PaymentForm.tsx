'use client'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaymentSchema } from '@/app/validationSchemas'
import ErrorMessege from '@/components/ErrorMessege'
import { ZodIssue } from 'zod'
import { addNewPayment, getPaymentData } from '@/lib/actions'
import { ClinicalCase } from '@prisma/client'
import SubmitPaymentBtn from './SubmitPaymentBtn'
import { useRef, useState } from 'react'

const PaymentForm = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState([])

  const newPaymentClient = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries())

    try {
      const data = PaymentSchema.parse(formValues)
      const newPayment = {
        value: data.value,
        clinicalCaseId: data.clinicalCaseId,
      }
      await addNewPayment(newPayment)

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
      <form ref={ref} action={newPaymentClient}>
        <div className="w-[100%] flex flex-col space-y-5 mt-8 ">
          <Select
            name="clinicalCaseId"
            required
            onValueChange={(e) => getPaymentData(e)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {patientCases.map(
                  (cas) =>
                    !cas.isPayed && (
                      <SelectItem key={cas.id} value={cas.id}>
                        {cas.title}--{cas.cost}
                      </SelectItem>
                    )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            name="value"
            type="number"
            placeholder="montant à versé"
            required
            className={fieldErrorMessage('value') && `border-destructive`}
          />
          <ErrorMessege>{fieldErrorMessage('value')}</ErrorMessege>
        </div>

        <DialogFooter className="mt-10">
          <SubmitPaymentBtn />
        </DialogFooter>
      </form>
    </>
  )
}

export default PaymentForm
