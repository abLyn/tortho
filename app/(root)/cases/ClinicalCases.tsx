import { Patient } from '@prisma/client'
import prisma from '@/prisma/PrismaClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import _ from 'lodash'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CaseStatusBadge from '../cases/CaseStatusBadge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatDate } from '@/app/functions'

const ClinicalCases = async ({ patient }: { patient: Patient }) => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    include: {
      Payment: true,
    },
    where: {
      patientId: patient.id,
    },
  })

  return (
    <div>
      <h1 className="text-xl text-primary font-semibold mb-10">
        Cas cliniques
      </h1>
      <Button asChild className="px-8 mb-10">
        <Link href={'/cases/new/' + patient.id} className="gap-2">
          <Plus />
        </Link>
      </Button>

      <div className="border  rounded-md p-5 w-fit">
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
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        {_.sum(Array.from(cas.Payment, (x) => x.value))}
                        .00
                      </AccordionTrigger>
                      <AccordionContent>
                        {cas.Payment.map((x) => (
                          <p key={x.id} className=" text-xs">
                            {x.value} - <span>{formatDate(x.createdAt)}</span>
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ClinicalCases
