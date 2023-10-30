import prisma from '@/prisma/PrismaClient'

const LatestCases = async () => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
  return (
    <div>
      <h3>Derniers cas:</h3>
      {clinicalCases.map((cas) => (
        <p key={cas.id} className="text-lg font-semibold  capitalize mb-3 ">
          {cas.title} :
          <span className="text-sm text-foreground ml-3">{cas.status}</span>
        </p>
      ))}
    </div>
  )
}

export default LatestCases
