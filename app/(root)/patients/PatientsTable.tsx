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
import DeleteBtn from './DeleteBtn'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { avatarPatient } from '@/app/functions'

const PatientsTable = ({ patients }: any) => {
  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader className="">
        <TableRow>
          <TableHead className=" w-[40px] ">Photo</TableHead>
          <TableHead className=" w-[200px] ">Nom</TableHead>
          <TableHead className="  w-[200px]">Prenom</TableHead>
          <TableHead className=" w-[200px] ">actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient: any) => (
          <TableRow key={patient.id} className="hover  ">
            <TableCell className="w-[40px] ">
              <Avatar>
                <AvatarImage
                  src={avatarPatient(patient)}
                  alt={patient.gender}
                />
                <AvatarFallback>{patient.gender}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className=" w-[200px]">
              <Link href={`/patients/${patient.id}`}>{patient.lastname}</Link>
            </TableCell>
            <TableCell className=" w-[200px]">{patient.firstname}</TableCell>
            <TableCell className=" flex gap-3 w-[200px]">
              <Button asChild variant="outline">
                <Link href={`/patients/${patient.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <DeleteBtn id={patient.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default PatientsTable
