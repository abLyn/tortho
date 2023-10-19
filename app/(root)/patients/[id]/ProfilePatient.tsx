import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AtSign, MapPin, Pencil, Phone } from 'lucide-react'
import Image from 'next/image'
import { capitalize, age } from './page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DeleteBtn from '../DeleteBtn'

const ProfilePatient = (props: any) => {
  const patient = props.patient
  console.log(patient)
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Image
          src={patient.image!}
          alt={patient.gender}
          width={120}
          height={120}
          className="mb-5 self-center"
        />
        <CardTitle>
          {capitalize(patient?.lastname)} {capitalize(patient?.firstname)}
        </CardTitle>
        <CardDescription>
          {patient?.dob.split('T')[0]}
          <span className="text-xl text-muted-foreground ml-5">
            {age(patient.dob)} {age(patient.dob) <= 1 ? 'an' : 'ans'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
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
        <Button asChild variant="outline">
          <Link href="#">
            <Pencil />
          </Link>
        </Button>
        <DeleteBtn id={patient.id} />
      </CardFooter>
    </Card>
  )
}

export default ProfilePatient
