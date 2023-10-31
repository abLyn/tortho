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
import Link from 'next/link'

import { avatarPatient } from '@/app/functions'
import { ClinicalCase, ClinicalCaseStatus } from '@prisma/client'
import { PatientWithCases } from './page'
import { Badge } from '@/components/ui/badge'

const patientOpenCases = (clinicalCases: ClinicalCase[]) => {
  const openCases = clinicalCases.filter(
    (clinicalCase) => clinicalCase.status === ClinicalCaseStatus.OPEN
  ).length // count cases in progress for a patient
  return openCases
}

const PatientsTable = ({ patients }: { patients: PatientWithCases[] }) => {
  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader className="w-fit bg-muted">
        <TableRow>
          <TableHead className=" w-[40px] ">Photo</TableHead>
          <TableHead className=" w-[80px] ">Nom</TableHead>
          <TableHead className=" w-[80px]">Prenom</TableHead>
          <TableHead className=" w-[40px] ">Cas en cours...</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient: PatientWithCases) => (
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
              {patientOpenCases(patient.ClinicalCase) === 0 ? (
                ''
              ) : (
                <Badge className="text-lg">
                  {patientOpenCases(patient.ClinicalCase)}
                </Badge>
              )}
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default PatientsTable
