import prisma from '@/prisma/PrismaClient'
import { Patient } from '@prisma/client'
import _ from 'lodash'
import Link from 'next/link'

import { formatDate } from '@/app/functions'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PaymentBtn from '../../payments/PaymentBtn'
import CaseStatusBadge from '../cases/CaseStatusBadge'
import NewCaseBtn from './NewCaseBtn'

const ClinicalCases = async ({ patient }: { patient: Patient }) => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    include: {
      payments: true,
      subCases: true,
    },
    where: {
      patientId: patient.id,
    },
  })

  return (
    <>
      <div className="flex justify-end my-4 gap-2 ">
        <NewCaseBtn patient={patient} />
        <PaymentBtn patientCases={clinicalCases} />
      </div>
      <ScrollArea className="h-[50vh] w-full rounded-md border">
        <Table>
          <TableHeader className="w-fit bg-muted">
            <TableRow>
              <TableHead className=" w-[80px] ">Cas</TableHead>
              <TableHead className=" w-[80px] ">Etat</TableHead>
              <TableHead className=" w-[80px]">Cout</TableHead>
              <TableHead className=" w-[120px]">Versements</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clinicalCases.map((cas) => (
              <TableRow key={cas.id} className="hover">
                <TableCell className="w-[80px] ">
                  <Link href={`/cases/${cas.id}`}>{cas.title}</Link>
                </TableCell>
                <TableCell className=" w-[80px]">
                  <CaseStatusBadge status={cas.status} />
                </TableCell>
                <TableCell className=" w-[80px] ">{cas.cost}.00</TableCell>
                <TableCell className=" w-[120px] ">
                  {_.sum(Array.from(cas.payments, (x) => x.value)) === 0 ? (
                    '0.00'
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="payments" className="border-none">
                        <AccordionTrigger className=" -py-2">
                          {_.sum(Array.from(cas.payments, (x) => x.value))}
                          .00
                        </AccordionTrigger>
                        <AccordionContent className=" mt-4">
                          {cas.payments.map((x) => (
                            <p key={x.id} className=" text-xs">
                              {x.value} - <span>{formatDate(x.createdAt)}</span>
                            </p>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  )
}

export default ClinicalCases
