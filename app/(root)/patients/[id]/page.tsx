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
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Le Patient - {id}
      </h1>
      {patient?.firstname}
    </>
  )
}

export default PatientDetailPage
