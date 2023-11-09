import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'
import Appointments from './Appointments'
import ProfilePatient from './PatientHeader'

import PatientTabs from './PatientTabs'

const PatientDetailPage = async ({ params }: { params: { id: string } }) => {
  const patient = await prisma.patient.findUnique({
    include: { clinicalCases: true },
    where: { id: params.id },
  })
  if (!patient) {
    redirect('/patients')
  }

  return (
    <>
      <h1 className=" text-4xl  font-extrabold tracking-tight lg:text-5xl mb-10 text-shadow-sm">
        Fiche {patient?.gender === 'Male' ? 'Patient' : 'Patiente'}
      </h1>
      <ProfilePatient patient={patient} />
      <div className="flex justify-between gap-10">
        <PatientTabs patient={patient} />
        <Appointments />
      </div>
    </>
  )
}

export default PatientDetailPage
