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
import { Pencil } from 'lucide-react'
import DeleteBtn from './DeleteBtn'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

export const revalidate = 0 // revalidate the data at most every hour

const PatientsTable = cache(async () => {
  const patients = await prisma.patient.findMany()
  console.log(patients)
  return (
    <Table>
      <TableCaption>La liste de tous les patients</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" w-[40px] ">Photo</TableHead>
          <TableHead className=" w-[100px] ">Nom</TableHead>
          <TableHead className="  w-[100px]">Prenom</TableHead>
          <TableHead className=" w-[100px] ">actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} className="hover ">
            <TableCell className=" ">
              <Avatar>
                <AvatarImage src={patient.image!} alt={patient.gender} />
                <AvatarFallback>{patient.gender}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className=" ">
              <Link href={`/patients/${patient.id}`}>{patient.lastname}</Link>
            </TableCell>
            <TableCell className=" ">{patient.firstname}</TableCell>
            <TableCell className=" flex gap-3">
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
})
export default PatientsTable
