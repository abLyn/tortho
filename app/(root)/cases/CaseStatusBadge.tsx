import { Badge } from '@/components/ui/badge'
import { ClinicalCaseStatus } from '@prisma/client'

const statusMap: Record<ClinicalCaseStatus, { label: string; style: string }> =
  {
    OPEN: {
      label: 'Nouveau',
      style: 'rounded-md  bg-orange-500',
    },
    IN_PROGRESS: {
      label: 'En cours',
      style: 'rounded-md  bg-violet-400',
    },
    CLOSED: {
      label: 'Termine',
      style: 'rounded-md  bg-green-400',
    },
  }

const CaseStatusBadge = ({ status }: { status: ClinicalCaseStatus }) => {
  return (
    <Badge className={statusMap[status].style}>{statusMap[status].label}</Badge>
  )
}

export default CaseStatusBadge
