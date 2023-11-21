'use client'

import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import SubmitBtn from './SubmitBtn'
import { useRef } from 'react'

const NewCaseForm = ({ patient }: { patient: Patient }) => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <>
      <form
        ref={ref}
        action={async (formData: FormData) => {
          ref.current?.reset()
          await addNewCase(formData)
        }}
      >
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
