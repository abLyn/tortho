'use server'

import { ClinicalCaseSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { revalidatePath } from 'next/cache'

interface NewCase {
  title: string
  cost: number
  patientId: string
}
//------------------------------------------------------------------------------
// Clinical Cases Actions
//------------------------------------------------------------------------------
export const addNewCase = async (newCase: NewCase) => {
  const data = ClinicalCaseSchema.parse(newCase)

  await prisma.clinicalCase.create({
    data: {
      title: data.title,
      cost: data.cost,
      patientId: data.patientId,
    },
  })
  revalidatePath('/patients/' + data.patientId, 'page')
}

//------------------------------------------------------------------------------
// Payments Actions
//------------------------------------------------------------------------------
export const addPayment = async (formData: FormData) => {
  const value = formData.get('value')
  const clinicalCaseId = formData.get('clinicalCaseId')

  await prisma.payment.create({
    data: {
      value: Number(value),
      clinicalCaseId: clinicalCaseId as string,
    },
  })
  revalidatePath('')
}
export const getPaymentData = async (clinicalCaseId: string) => {
  const selectedCase = await prisma.clinicalCase.findFirst({
    where: {
      id: clinicalCaseId as string,
    },
  })
}

//------------------------------------------------------------------------------
// Appointments Actions
//------------------------------------------------------------------------------
