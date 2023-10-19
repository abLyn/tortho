import { Button } from '@/components/ui/button'
import prisma from '@/prisma/PrismaClient'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import DeleteBtn from '../DeleteBtn'
import { redirect } from 'next/navigation'
import Image from 'next/image'

interface Props {
  params: { id: string }
}
const age = (date: string) => {
  const dob = new Date(date)
  var diff_ms = Date.now() - dob.getTime()
  var age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
const PatientDetailPage = async ({ params: { id } }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id },
  })
  if (!patient) {
    redirect('/patients')
  }

  return (
    <>
      <h1 className=" text-4xl  font-extrabold tracking-tight lg:text-5xl mb-5 text-shadow-sm">
        Fiche Patient
      </h1>
      <Button asChild variant="outline">
        <Link href="#">
          <Pencil />
        </Link>
      </Button>
      <DeleteBtn id={patient.id} />
      <div className=" flex justify-center ">
        <Image
          src={patient.image!}
          alt={patient.gender}
          width={120}
          height={120}
        />
      </div>
      <div className=" justify-center">
        <p className=" pb-5 text-3xl text-center text-slate-400 font-semibold tracking-tight transition-colors first:mt-0 p-4">
          {capitalize(patient?.lastname)} {capitalize(patient?.firstname)}
        </p>

        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          Deta de naissance:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.dob.split('T')[0]}
          </span>
        </p>
        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          sexe:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.gender}
          </span>
        </p>
        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          telephone:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.phone}
          </span>
        </p>
        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          email:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.email}
          </span>
        </p>
        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          adresse:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.address}
          </span>
        </p>

        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          Antecedents:
          <span className="text-xl text-muted-foreground ml-5 ">
            {patient?.medicalHistory}
          </span>
        </p>
        <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          Age:
          <span className="text-xl text-muted-foreground ml-5 ">
            {age(patient.dob)}
          </span>
        </p>
      </div>
    </>
  )
}

export default PatientDetailPage
