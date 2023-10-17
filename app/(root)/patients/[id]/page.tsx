import { Button } from '@/components/ui/button'
import prisma from '@/prisma/PrismaClient'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import DeleteBtn from '../DeleteBtn'
import { redirect } from 'next/navigation'

interface Props {
  params: { id: string }
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
      <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
        Nom:
        <span className="text-xl text-muted-foreground ml-5 ">
          {patient?.lastname}
        </span>
      </p>
      <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
        Prenom:
        <span className="text-xl text-muted-foreground ml-5">
          {patient?.firstname}
        </span>
      </p>
      <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
        Deta de naissance:
        <span className="text-xl text-muted-foreground ml-5 ">
          {patient?.dob}
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
        avatar:
        <span className="text-xl text-muted-foreground ml-5 ">
          {patient?.image}
        </span>
      </p>
      <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
        Antecedents:
        <span className="text-xl text-muted-foreground ml-5 ">
          {patient?.medicalHistory}
        </span>
      </p>
    </>
  )
}

export default PatientDetailPage
