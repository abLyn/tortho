import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ClinicalCase } from '@prisma/client'
import { Euro } from 'lucide-react'
import PaymentForm from './PaymentForm'

const PaymentBtn = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  let n = 0 // not payed cases
  patientCases.map((cas) => !cas.isPayed && n++)

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 " disabled={n ? false : true}>
            <Euro />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Nouveau versement</DialogTitle>
          <PaymentForm patientCases={patientCases} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentBtn
