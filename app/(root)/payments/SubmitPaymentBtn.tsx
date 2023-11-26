import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Wallet2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

const SubmitPaymentBtn = () => {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full gap-2 mt-10 " type="submit" disabled={pending}>
      <Wallet2 size={16} /> Valider {pending && <Spinner />}
    </Button>
  )
}

export default SubmitPaymentBtn
