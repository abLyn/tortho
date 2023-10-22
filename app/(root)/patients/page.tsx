import prisma from '@/prisma/PrismaClient'
import { cache } from 'react'
import delay from 'delay'
import PatientsTable from './PatientsTable'

import NoPatients from './NoPatients'
import Section from './Section'

export const revalidate = 0 // revalidate the data at most every ?... sec

const Patients = cache(async () => {
  const patients = await prisma.patient.findMany()
  await delay(2000)
  return (
    <>
      <Section />
      {patients[0] ? <PatientsTable patients={patients} /> : <NoPatients />}
    </>
  )
})

export default Patients
