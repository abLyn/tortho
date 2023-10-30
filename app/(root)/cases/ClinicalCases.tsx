import { ClinicalCase, Patient } from '@prisma/client'
import prisma from '@/prisma/PrismaClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const ClinicalCases = async ({ patient }: { patient: Patient }) => {
  const clinicalCases = await prisma.clinicalCase.findMany({
    where: { patientId: patient.id },
  })

  return (
    <div>
      <h1 className="text-xl text-primary font-semibold mb-10">
        Cas cliniques
      </h1>
      <Button asChild className="px-8 mb-10">
        <Link href={'/cases/new/' + patient.id} className="gap-2">
          <Plus />
        </Link>
      </Button>

      {clinicalCases.map((clinicalCase: ClinicalCase) => (
        <p
          key={clinicalCase.id}
          className="text-lg font-semibold  capitalize mb-3 "
        >
          {clinicalCase.title} :
          <span className="text-sm text-foreground ml-3">
            {clinicalCase.status}
          </span>
        </p>
      ))}
    </div>
  )
}

export default ClinicalCases
