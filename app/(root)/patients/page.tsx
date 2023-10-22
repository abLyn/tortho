import prisma from '@/prisma/PrismaClient'
import { cache } from 'react'

import PatientsTable from './PatientsTable'
import { AlertTriangle } from 'lucide-react'
import NoPatients from './NoPatients'

export const revalidate = 0 // revalidate the data at most every ?... sec

const Patients = cache(async () => {
  const patients = await prisma.patient.findMany()
  console.log(patients)
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Patients
      </h1>
      {patients[0] ? <PatientsTable patients={patients} /> : <NoPatients />}
    </>
  )
})

export default Patients
