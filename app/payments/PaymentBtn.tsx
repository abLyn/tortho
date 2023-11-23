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
import prisma from '@/prisma/PrismaClient'

const PaymentBtn = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {patientCases.length && (
            <Button className="gap-2 ">
              <Euro />
            </Button>
          )}
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
