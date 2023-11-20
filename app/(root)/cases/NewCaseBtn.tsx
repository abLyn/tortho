import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { addNewCase } from '@/lib/actions'
import { Patient } from '@prisma/client'
import { FilePlus2 } from 'lucide-react'

const NewCaseBtn = ({ patient }: { patient: Patient }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="gap-2 ">
            <FilePlus2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={addNewCase}>
            <AlertDialogTitle>Nouveau Cas</AlertDialogTitle>

            <div className="w-[100%] flex flex-col space-y-5 mt-9">
              <Input name="patientId" type="hidden" value={patient.id} />
              <Input name="title" type="text" placeholder="titre" required />
              <Input name="cost" type="number" placeholder="cout" required />
            </div>

            <AlertDialogFooter className="mt-10">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="w-full" type="submit">
                Créer
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default NewCaseBtn
