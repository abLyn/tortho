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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { avatarPatient } from '@/app/functions'
import { Patient } from '@prisma/client'
import prisma from '@/prisma/PrismaClient'

const CurrentPatientOpenCases = async (patient: Patient) => {
  const openClinicalCases = await prisma.clinicalCase.count({
    where: {
      patient,
      status: 'InProgress',
    },
  })
  return openClinicalCases
}

const PatientsTable = ({ patients }: { patients: Patient[] }) => {
  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader className="w-fit bg-muted">
        <TableRow>
          <TableHead className=" w-[40px] ">Photo</TableHead>
          <TableHead className=" w-[80px] ">Nom</TableHead>
          <TableHead className=" w-[80px]">Prenom</TableHead>
          <TableHead className=" w-[40px] ">Cas ouvert</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient: Patient) => (
          <TableRow key={patient.id} className="hover">
            <TableCell className="w-[40px] ">
              <Avatar>
                <AvatarImage
                  src={avatarPatient(patient)}
                  alt={patient.gender}
                />
                <AvatarFallback>{patient.gender}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className=" w-[80px]">
              <Link href={`/patients/${patient.id}`}>{patient.lastname}</Link>
            </TableCell>
            <TableCell className=" w-[80px]">{patient.firstname}</TableCell>
            <TableHead className=" w-[40px] ">
              {CurrentPatientOpenCases(patient)}
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default PatientsTable
