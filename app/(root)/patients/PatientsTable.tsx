import prisma from '@/prisma/PrismaClient'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { cache } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import DeleteBtn from './DeleteBtn'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

export const revalidate = 0 // revalidate the data at most every hour

interface Patient {
  id: string
  firstname: string
  lastname: string
}

interface Props {
  query: string
}

const PatientsTable = cache(async () => {
  const patients = await prisma.patient.findMany()

  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead className="text-center">Prenom</TableHead>
          <TableHead className="text-center">actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} className="hover ">
            <TableCell className="font-medium">
              <Link href={`/patients/${patient.id}`}>{patient.lastname}</Link>
            </TableCell>
            <TableCell className="text-center">{patient.firstname}</TableCell>
            <TableCell className="text-center flex gap-3">
              <Button asChild variant="outline">
                <Link href={`/patients/${patient.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <DeleteBtn />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})
export default PatientsTable
