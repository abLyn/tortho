import { age, avatarPatient } from '@/app/functions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Patient } from '@prisma/client'
import { AtSign, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import DeletePatientBtn from './DeletePatientBtn'
import EditPatientBtn from './EditPatientButton'

const AboutPatient = ({ patient }: { patient: Patient }) => {
  return (
    <Card className="w-full  shadow-sm p-5 ">
      <CardHeader>
        <CardTitle className="capitalize">
          {patient?.lastname} {patient?.firstname}
        </CardTitle>

        <CardDescription>
          {patient?.dob.split('T')[0]}

          <span className="text-2xl font-semibold ml-5">
            {age(patient.dob)} {age(patient.dob) <= 1 ? 'an' : 'ans'}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="my-4" />
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Phone /> {patient?.phone}
          </div>
          {patient?.email && (
            <div className="flex gap-2">
              <AtSign /> {patient?.email}
            </div>
          )}

          {patient?.address && (
            <div className="flex gap-2">
              <MapPin /> {patient?.address}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <EditPatientBtn patientId={patient.id} />
        <DeletePatientBtn patientId={patient.id} />
      </CardFooter>
    </Card>
  )
}

export default AboutPatient