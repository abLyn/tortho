'use client'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addPayment, getPaymentData } from '@/lib/actions'
import { ClinicalCase } from '@prisma/client'
import { Euro } from 'lucide-react'

const PaymentBtn = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="gap-2 ">
            <Euro />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={addPayment}>
            <AlertDialogTitle>Nouveau versement</AlertDialogTitle>

            <div className="w-[100%] flex flex-col space-y-5 mt-9">
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
                    {patientCases.map((cas) => (
                      <SelectItem key={cas.id} value={cas.id}>
                        {cas.title}--{cas.cost}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                name="value"
                type="number"
                placeholder="montant à versé"
                required
              />
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

export default PaymentBtn
