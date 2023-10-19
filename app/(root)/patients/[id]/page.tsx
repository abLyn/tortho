import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'
import ProfilePatient from './ProfilePatient'

interface Props {
  params: { id: string }
}
export const age = (date: string) => {
  const dob = new Date(date)
  const diff_ms = Date.now() - dob.getTime()
  const age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
export const PatientDetailPage = async ({ params: { id } }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id },
  })
  if (!patient) {
    redirect('/patients')
  }

  return (
    <>
      <h1 className=" text-4xl  font-extrabold tracking-tight lg:text-5xl mb-10 text-shadow-sm">
        Fiche {patient?.gender === 'boy' ? 'Patient' : 'Patiente'}
      </h1>

      <ProfilePatient patient={patient} />
    </>
  )
}

export default PatientDetailPage
