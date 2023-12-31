import prisma from '@/prisma/PrismaClient'
//import { cache } from 'react'
//import delay from 'delay'
import PatientsTable from './PatientsTable'

import { Prisma } from '@prisma/client'
import Paginator from '../../../components/Paginator'
import NoPatients from './NoPatients'
import TopSection from './TopSection'

interface Props {
  params: {}
  searchParams: {
    page: string
    query: string
  }
}

export type PatientWithCases = Prisma.PatientGetPayload<{
  include: { clinicalCases: true }
}>

//export const revalidate = 0 // revalidate the data at most every ?... sec
// to desable caching put the component in cache()
const Patients = async ({ searchParams: { page, query } }: Props) => {
  const pageNumber = parseInt(page) || 1
  const pageSize = 10
  const patients = await prisma.patient.findMany({
    include: {
      clinicalCases: true,
    },
    orderBy: {
      lastname: 'asc',
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  })

  const patientCount = await prisma.patient.count()
  //await delay(2000)
  return (
    <>
      <TopSection query={query} />
      {patients[0] ? <PatientsTable patients={patients} /> : <NoPatients />}
      <Paginator
        itemCount={patientCount}
        pageSize={10}
        currentPage={pageNumber}
      />
    </>
  )
}

export default Patients
