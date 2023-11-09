import prisma from '@/prisma/PrismaClient'
import Link from 'next/link'

const SubCases = async ({ id }: { id: string }) => {
  const subCases = await prisma.clinicalCase.findMany({
    where: { parentId: id },
  })

  return (
    <>
      <h1 className="text-lg text-primary font-bold">Cas inclus</h1>
      <ul>
        {subCases.map((cas) => (
          <li key={cas.id}>
            <Link href={`/cases/${cas.id}`}>{cas.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SubCases
