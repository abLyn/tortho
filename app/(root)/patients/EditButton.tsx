import { Button } from '@/components/ui/button'

import { Pencil } from 'lucide-react'
import Link from 'next/link'

const EditBtn = ({ patientId }: { patientId: string }) => {
  return (
    <Button asChild variant="outline">
      <Link href={`/patients/${patientId}/edit`}>
        <Pencil />
      </Link>
    </Button>
  )
}

export default EditBtn
