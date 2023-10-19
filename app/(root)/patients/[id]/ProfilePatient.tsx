import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AtSign, MapPin, Pencil, Phone } from 'lucide-react'
import Image from 'next/image'
import { age } from '@/app/functions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DeleteBtn from '../DeleteBtn'

const ProfilePatient = (props: any) => {
  const patient = props.patient
  return (
    <Card className="w-[400px]  ">
      <CardHeader>
        <Image
          src={patient.image!}
          alt={patient.gender}
          width={100}
          height={100}
          className="mb-5 "
        />
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
