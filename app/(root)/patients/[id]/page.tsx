import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'
import ProfilePatient from './ProfilePatient'
import Appointments from './Appointments'
import ClinicalCases from '../../cases/ClinicalCases'

const PatientDetailPage = async ({ params }: { params: { id: string } }) => {
  const patient = await prisma.patient.findUnique({
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
      <div className="flex justify-between">
        <ProfilePatient patient={patient} />
        <ClinicalCases patient={patient} />
        <Appointments />
      </div>
    </>
  )
}

export default PatientDetailPage
