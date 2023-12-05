import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Euro } from 'lucide-react'

import CreditForm from './CreditForm'

const IncreaseCreditBtn = ({ patientId }: { patientId: string }) => {
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
          <CreditForm patientId={patientId} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default IncreaseCreditBtn
