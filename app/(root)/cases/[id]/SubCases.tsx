import prisma from '@/prisma/PrismaClient'

const SubCases = async ({ id }: { id: string }) => {
  const subCases = await prisma.clinicalCase.findMany({
    where: { parentId: id },
  })

  return (
    <>
      <h1 className="text-lg text-primary font-bold">Cas inclus</h1>
      {subCases.map((cas) => (
        <p key={cas.id}>{cas.title}</p>
      ))}
    </>
  )
}

export default SubCases
