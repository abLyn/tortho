import { age, avatarPatient } from '@/app/functions'
import { Card } from '@/components/ui/card'
import { Patient } from '@prisma/client'
import { Phone } from 'lucide-react'
import Image from 'next/image'

const PatientHeader = ({ patient }: { patient: Patient }) => {
  return (
    <Card className=" h-fit mb-4 shadow-sm p-5  flex gap-10">
      <Image
        src={avatarPatient(patient)}
        alt={patient.gender}
        width={120}
        height={120}
        className="  rounded-full border-8 p-2 border-primary"
      />

      <div className="flex flex-col gap-2 self-end">
        <h1 className="text-3xl font-semibold capitalize">
          {patient?.lastname} {patient?.firstname}
          <span className="text-2xl text-muted-foreground font-semibold ml-5">
            {'('} {age(patient.dob)} {age(patient.dob) <= 1 ? 'an' : 'ans'}
            {' )'}
          </span>
        </h1>
        <div className="flex gap-2 text-lg ">
          <Phone /> {patient?.phone}
        </div>
      </div>
    </Card>
  )
}

export default PatientHeader
