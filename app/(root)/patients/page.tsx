import prisma from '@/prisma/PrismaClient'
import { cache } from 'react'
//import delay from 'delay'
import PatientsTable from './PatientsTable'

import NoPatients from './NoPatients'
import Section from './Section'
import Paginator from '../../../components/Paginator'
/*
interface Props {
  searchParams: { page: string }
}
*/
export const revalidate = 0 // revalidate the data at most every ?... sec

const Patients = cache(
  async ({ searchParams }: { searchParams: { page: string } }) => {
    const page = parseInt(searchParams.page) || 1
    const pageSize = 10
    const patients = await prisma.patient.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const patientCount = await prisma.patient.count()
    //await delay(2000)
    return (
      <>
        <Section />
        {patients[0] ? <PatientsTable patients={patients} /> : <NoPatients />}
        <Paginator itemCount={patientCount} pageSize={10} currentPage={page} />
      </>
    )
  }
)

export default Patients
