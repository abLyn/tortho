import { Button } from '@/components/ui/button'
import { ClinicalCase } from '@prisma/client'
import { Plus } from 'lucide-react'

const ClinicalCases = ({
  clinicalCases,
}: {
  clinicalCases: ClinicalCase[]
}) => {
  return (
    <div>
      <h1 className="text-xl text-primary font-semibold mb-10">
        Cas cliniques
      </h1>
      <Button variant="outline">
        <Plus />
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
