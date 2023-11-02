import { ClinicalCase, Patient } from '@prisma/client'
import prisma from '@/prisma/PrismaClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CaseStatusBadge from '../cases/CaseStatusBadge'

const ClinicalCases = async ({ patient }: { patient: Patient }) => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    where: { patientId: patient.id },
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
              <TableHead className=" w-[80px]">Verses</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clinicalCases.map((cas) => (
              <TableRow key={cas.id} className="hover">
                <TableCell className="w-[80px] "> {cas.title}</TableCell>
                <TableCell className=" w-[80px]">
                  <CaseStatusBadge status={cas.status} />
                </TableCell>
                <TableCell className=" w-[80px] ">{cas.cost}.00</TableCell>
                <TableCell className=" w-[80px] ">0.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ClinicalCases
