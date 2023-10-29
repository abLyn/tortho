import { ClinicalCase } from '@prisma/client'

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
