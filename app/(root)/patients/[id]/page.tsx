import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'
import ProfilePatient from './ProfilePatient'

export const PatientDetailPage = async ({
  params,
}: {
  params: { id: string }
}) => {
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

      <ProfilePatient patient={patient} />
    </>
  )
}

export default PatientDetailPage
