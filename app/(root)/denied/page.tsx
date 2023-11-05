import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

const accessDeniedPage = () => {
  return (
    <div className="flex justify-center my-24 ">
      <Alert className="   w-auto ">
        <AlertCircle className="h-10 w-10" color="red" />
        <AlertTitle className="text-4xl ml-5 ">Oops!</AlertTitle>
        <AlertDescription className="text-xl pb-10 pt-5 mx-20 ">
          Vous n avez pas le droit d acceder a cette page !
        </AlertDescription>
        <Button asChild className="w-full">
          <Link href="/" className="gap-2 ">
            Retour
          </Link>
        </Button>
      </Alert>
    </div>
  )
}

export default accessDeniedPage
