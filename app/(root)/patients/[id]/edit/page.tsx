import React from 'react'
import PatientForm from '../../_components/PatientForm'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/PrismaClient'

interface Props {
  params: { id: string }
}

const editPatientPage = async ({ params }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  })
  if (!patient) notFound()

  return <PatientForm patient={patient} />
}

export default editPatientPage
