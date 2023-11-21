import { Button } from '@/components/ui/button'
import { FilePlus2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import Spinner from '@/components/Spinner'

const SubmitBtn = () => {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full gap-2 mt-10 " type="submit" disabled={pending}>
      <FilePlus2 size={16} />
      Créer {pending && <Spinner />}
    </Button>
  )
}

export default SubmitBtn
