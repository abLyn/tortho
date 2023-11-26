import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Patient } from '@prisma/client'
import { Euro } from 'lucide-react'
import SavingForm from './SavingForm'

const AddSavingBtn = ({ patientId }: { patientId: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 ">
            <Euro />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Nouveau Epargne:</DialogTitle>
          <SavingForm patientId={patientId} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddSavingBtn
