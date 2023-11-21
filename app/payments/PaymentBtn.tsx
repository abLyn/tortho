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
import { Euro, Wallet2 } from 'lucide-react'

const PaymentBtn = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 ">
            <Euro />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form action={addPayment}>
            <DialogTitle>Nouveau versement</DialogTitle>

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

            <DialogFooter className="mt-10">
              <Button className="w-full gap-2" type="submit">
                <Wallet2 size={16} /> Valider
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentBtn
