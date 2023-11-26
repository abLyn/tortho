import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { useFormStatus } from 'react-dom'

const SubmitSavingBtn = () => {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full gap-2 mt-10 " type="submit" disabled={pending}>
      <Coins /> Valider {pending && <Spinner />}
    </Button>
  )
}

export default SubmitSavingBtn
