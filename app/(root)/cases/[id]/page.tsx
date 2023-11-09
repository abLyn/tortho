import prisma from '@/prisma/PrismaClient'
import { redirect } from 'next/navigation'
import SubCases from './SubCases'

const page = async ({ params }: { params: { id: string } }) => {
  const clinicalCase = await prisma.clinicalCase.findUnique({
    include: {
      patient: true,
      payments: true,
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
        {clinicalCase.payments.map((p) => (
          <li key={p.id}>
            {p.value}.00 DA - {p.createdAt.toUTCString()}
          </li>
        ))}
      </ul>
      <SubCases id={params.id} />
    </div>
  )
}

export default page
