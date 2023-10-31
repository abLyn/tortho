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
      <TableHeader className="w-fit bg-muted">
        <TableRow>
          <TableHead className=" w-[10%] ">Photo</TableHead>
          <TableHead className=" w-[20%px] ">Nom & Prénom</TableHead>
          <TableHead className=" w-[40px] ">
            Nombre des cas en cours...
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient: PatientWithCases) => (
          <TableRow key={patient.id} className="hover">
            <TableCell className="w-[10%] ">
              <Avatar>
                <AvatarImage
                  src={avatarPatient(patient)}
                  alt={patient.gender}
                />
                <AvatarFallback>{patient.gender}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className=" w-[20%]">
              <Link href={`/patients/${patient.id}`}>
                {patient.lastname + ' ' + patient.firstname}
              </Link>
            </TableCell>

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
