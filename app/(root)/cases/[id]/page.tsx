import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { id: string } }) => {
  const clinicalCase = await prisma.clinicalCase.findUnique({
    include: {
      patient: true,
      Payment: true,
    },
    where: { id: params.id },
  })
  if (!clinicalCase) {
    redirect('/patients')
  }

  return (
    <div>
      <h1 className="text-2xl">
        Patient:{' '}
        {clinicalCase.patient.lastname + ' ' + clinicalCase.patient.firstname}
      </h1>
      <h1 className="text-xl">Cas de: {clinicalCase.title}</h1>
      <h1>Cout: {clinicalCase.cost}</h1>
      <h1>Versements :</h1>
      <ul>
        {clinicalCase.Payment.map((p) => (
          <li key={p.id}>
            {p.value}.00 DA - {p.createdAt.toUTCString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page
