import { Separator } from '@/components/ui/separator'
import prisma from '@/prisma/PrismaClient'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
    <>
      <h3 className="text-2xl font-semibold text-primary mt-10 mb-3">
        Derniers cas:
      </h3>
      <div className="border  rounded-md p-5 w-fit">
        <Table>
          <TableCaption>5 derniers cas pris en charge</TableCaption>
          <TableHeader className="w-fit bg-muted">
            <TableRow>
              <TableHead className=" w-[80px] ">Cas</TableHead>
              <TableHead className=" w-[80px] ">Etat</TableHead>
              <TableHead className=" w-[80px]">Patient</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clinicalCases.map((cas) => (
              <TableRow key={cas.id} className="hover">
                <TableCell className="w-[80px] "> {cas.title}</TableCell>
                <TableCell className=" w-[80px]">{cas.status}</TableCell>
                <TableCell className=" w-[80px] ">
                  {cas.patient.lastname + ' ' + cas.patient.firstname}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default LatestCases
