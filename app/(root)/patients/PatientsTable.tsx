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

interface Patient {
  id: string
  firstname: string
  lastname: string
}

interface Props {
  query: string
}

const PatientsTable = async () => {
  const patients = await prisma.patient.findMany()

  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead className="text-center">Prenom</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} className="hover">
            <TableCell className="font-medium">
              <Link href={`/patients/${patient.id}`}>{patient.lastname}</Link>
            </TableCell>
            <TableCell className="text-center">{patient.firstname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PatientsTable
