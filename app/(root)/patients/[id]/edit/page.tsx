import React from 'react'
import PatientForm from '../../_components/PatientForm'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/PrismaClient'

const editPatientPage = async ({ params }: { params: { id: string } }) => {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  })
  if (!patient) notFound()

  return <PatientForm patient={patient} />
}

export default editPatientPage
