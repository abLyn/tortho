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
  const clinicalCases = await prisma.clinicalCase.findMany({
    where: { patientId: patient.id },
  })

  return (
    <>
      <h1 className=" text-4xl  font-extrabold tracking-tight lg:text-5xl mb-10 text-shadow-sm">
        Fiche {patient?.gender === 'Male' ? 'Patient' : 'Patiente'}
      </h1>

      <ProfilePatient patient={patient} clinicalCases={clinicalCases} />
    </>
  )
}

export default PatientDetailPage
