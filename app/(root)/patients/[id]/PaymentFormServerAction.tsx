import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import prisma from '@/prisma/PrismaClient'
import { ClinicalCase } from '@prisma/client'

const PaymentForm = ({ patientCases }: { patientCases: ClinicalCase[] }) => {
  const addPayment = async (formData: FormData) => {
    'use server'

    const value = formData.get('value')
    const clinicalCaseId = formData.get('clinicalCaseId')

    await prisma.payment.create({
      data: {
        value: Number(value),
        clinicalCaseId: clinicalCaseId as string,
      },
    })
  }

  return (
    <div className=" m-auto w-[600px] ">
      <form action={addPayment}>
        <CardContent className="grid gap-4">
          <div className="w-[100%]">
            <Label htmlFor="clinicalCase">Cas cliniques</Label>

            <Select name="clinicalCaseId" defaultValue="---" required>
              <SelectTrigger>
                <SelectValue placeholder="---" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {patientCases.map((cas) => (
                    <SelectItem key={cas.id} value={cas.id}>
                      {cas.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Input name="value" type="number" placeholder="cout" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <Button type="submit" className="w-full gap-2">
            Créer
          </Button>
        </CardFooter>
      </form>
    </div>
  )
}

export default PaymentForm
