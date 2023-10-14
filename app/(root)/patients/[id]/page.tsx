import prisma from '@/prisma/PrismaClient'

interface Props {
  params: { id: string }
}

const PatientDetailPage = async ({ params: { id } }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id },
  })

  return (
    <>
      <h1 className=" text-4xl  font-extrabold tracking-tight lg:text-5xl mb-5 text-shadow-sm">
        Fiche Patient
      </h1>
      <p className="font-semibold text-xl">Nom: {patient?.lastname}</p>
      <p className="font-semibold text-xl">Prenom: {patient?.firstname}</p>
      <p className="font-semibold text-xl">dob: {patient?.dob}</p>
      <p className="font-semibold text-xl">gender: {patient?.gender}</p>
      <p className="font-semibold text-xl">phone: {patient?.phone}</p>
      <p className="font-semibold text-xl">email: {patient?.email}</p>
      <p className="font-semibold text-xl">address:{patient?.address}</p>
      <p className="font-semibold text-xl">image: {patient?.image}</p>
      <p className="font-semibold text-xl">
        medicalHistory: {patient?.medicalHistory}
      </p>
    </>
  )
}

export default PatientDetailPage
