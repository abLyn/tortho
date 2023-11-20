'use server'

import prisma from '@/prisma/PrismaClient'

export const addPayment = async (formData: FormData) => {
  const value = formData.get('value')
  const clinicalCaseId = formData.get('clinicalCaseId')

  await prisma.payment.create({
    data: {
      value: Number(value),
      clinicalCaseId: clinicalCaseId as string,
    },
  })
}

export const getPaymentData = async (clinicalCaseId: string) => {
  const selectedCase = await prisma.clinicalCase.findFirst({
    where: {
      id: clinicalCaseId as string,
    },
  })
  console.log(selectedCase?.cost)
}
