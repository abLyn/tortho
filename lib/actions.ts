'use server'

import prisma from '@/prisma/PrismaClient'
import { revalidatePath } from 'next/cache'

//------------------------------------------------------------------------------
// Clinical Cases Actions
//------------------------------------------------------------------------------
export const addNewCase = async (formData: FormData) => {
  const title = formData.get('title')
  const cost = formData.get('cost')
  const patientId = formData.get('patientId')

  await prisma.clinicalCase.create({
    data: {
      title: title as string,
      cost: Number(cost),
      patientId: patientId as string,
    },
  })
  revalidatePath('/patients/' + patientId, 'page')
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
