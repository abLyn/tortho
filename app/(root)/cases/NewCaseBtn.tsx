'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import { FilePlus2 } from 'lucide-react'

const NewCaseBtn = ({ patient }: { patient: Patient }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 ">
            <FilePlus2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Nouveau Cas</DialogTitle>
          <form action={addNewCase}>
            <div className="w-[100%] flex flex-col space-y-5 mt-8">
              <Input name="title" type="text" placeholder="titre" required />
              <Input name="cost" type="number" placeholder="cout" required />
            </div>
            <Input name="patientId" type="hidden" value={patient.id} />
            <DialogFooter className="">
              <Button className="w-full gap-2 mt-10" type="submit">
                <FilePlus2 size={16} /> Créer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewCaseBtn
