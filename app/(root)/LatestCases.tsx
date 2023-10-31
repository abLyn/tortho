import { Separator } from '@/components/ui/separator'
import prisma from '@/prisma/PrismaClient'

const LatestCases = async () => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })
  return (
    <div>
      <h3 className="text-2xl text-primary mt-10 mb-3">Derniers cas:</h3>
      <div className="border  rounded-md p-5 w-fit">
        {clinicalCases.map((cas) => (
          <>
            <p key={cas.id} className="text-lg font-semibold  capitalize mb-3 ">
              {cas.title} :
              <span className="text-sm text-foreground ml-3">{cas.status}</span>
              <span className="text-sm text-foreground ml-3">
                {cas.patient.lastname} {cas.patient.firstname}
              </span>
            </p>
            <Separator />
          </>
        ))}
      </div>
    </div>
  )
}

export default LatestCases
