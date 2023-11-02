import { avatarPatient } from '@/app/functions'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import Section from './TopSection'

const loadingPatientsPage = () => {
  const patients = [1, 2, 3, 4, 5]
  return (
    <>
      <Section />
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
          {patients.map((patient) => (
            <TableRow key={patient} className="hover  ">
              <TableCell className=" w-[40px]">
                <Skeleton className="h-10 w-10 rounded-full" />
              </TableCell>
              <TableCell className="w-[200px] ">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell className=" w-[200px]">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell className=" flex gap-3 w-[200px]">
                <Skeleton className="h-10 w-[60px]" />
                <Skeleton className="h-10 w-[60px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default loadingPatientsPage
