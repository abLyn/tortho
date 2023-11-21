import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Patient } from '@prisma/client'
import { FilePlus2 } from 'lucide-react'
import NewCaseForm from './NewCaseForm'

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
          <NewCaseForm patient={patient} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewCaseBtn
