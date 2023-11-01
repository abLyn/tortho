import prisma from '@/prisma/PrismaClient'
import { cache } from 'react'
//import delay from 'delay'
import PatientsTable from './PatientsTable'

import Paginator from '../../../components/Paginator'
import NoPatients from './NoPatients'
import Section from './Section'
import { Prisma } from '@prisma/client'

interface Props {
  params: {}
  searchParams: {
    page: string
    query: string
  }
}

export type PatientWithCases = Prisma.PatientGetPayload<{
  include: { ClinicalCase: true }
}>

export const revalidate = 0 // revalidate the data at most every ?... sec

const Patients = cache(async ({ searchParams: { page, query } }: Props) => {
  const pageNumber = parseInt(page) || 1
  const pageSize = 10
  const patients = await prisma.patient.findMany({
    include: {
      ClinicalCase: true,
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  })

  const patientCount = await prisma.patient.count()
  //await delay(2000)
  return (
    <>
      <Section query={query} />
      {patients[0] ? <PatientsTable patients={patients} /> : <NoPatients />}
      <Paginator
        itemCount={patientCount}
        pageSize={10}
        currentPage={pageNumber}
      />
    </>
  )
})

export default Patients
