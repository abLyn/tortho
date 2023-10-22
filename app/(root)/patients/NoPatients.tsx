import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Info } from 'lucide-react'

const NoPatients = () => {
  return (
    <div className="flex justify-center my-24">
      <Alert className="   w-auto ">
        <Info className="h-10 w-10 " />
        <AlertTitle className="text-4xl ml-5 ">Info</AlertTitle>
        <AlertDescription className="text-xl pb-10 pt-5 mx-20 ">
          Aucun patient dans la base de données !
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default NoPatients
