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

import { Pencil } from 'lucide-react'
import DeleteBtn from './[id]/DeletePatientBtn'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { avatarPatient } from '@/app/functions'
import EditPatientBtn from './[id]/EditPatientButton'

const PatientsTable = ({ patients }: any) => {
  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader className="w-fit bg-muted">
        <TableRow>
          <TableHead className=" w-[40px] ">Photo</TableHead>
          <TableHead className=" w-[80px] ">Nom</TableHead>
          <TableHead className=" w-[80px]">Prenom</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient: any) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default PatientsTable
