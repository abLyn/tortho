'use server'

import {
  ClinicalCaseSchema,
  CreditSchema,
  PaymentSchema,
} from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { revalidatePath } from 'next/cache'
import _ from 'lodash'

type NewCase = {
  title: string
  cost: number
  patientId: string
}
type NewPayment = {
  value: number
  clinicalCaseId: string
}
type NewCredit = {
  mount: number
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
////////////////////////////////////////////////////////////////////////////////

//------------------------------------------------------------------------------
// Payments Actions
//------------------------------------------------------------------------------
export const addNewPayment = async (newPayment: NewPayment) => {
  const data = PaymentSchema.parse(newPayment)

  const currentCase = await prisma.clinicalCase.findFirst({
    include: {
      payments: true,
    },
    where: {
      id: data.clinicalCaseId,
    },
  })

  // set case payed
  if (currentCase) {
    let casePayments = _.sum(Array.from(currentCase.payments, (x) => x.value))

    //payment> rest or not
    const value =
      data.value + casePayments > currentCase.cost
        ? currentCase.cost - casePayments
        : data.value

    if (!currentCase?.isPayed) {
      await prisma.payment.create({
        data: {
          value: value,
          clinicalCaseId: data.clinicalCaseId,
        },
      })

      casePayments = casePayments + data.value

      if (casePayments >= currentCase.cost) {
        await prisma.clinicalCase.update({
          where: {
            id: data.clinicalCaseId,
          },
          data: {
            isPayed: true,
          },
        })
      }
    }
    revalidatePath('')
  }
}
export const getPaymentData = async (clinicalCaseId: string) => {
  const selectedCase = await prisma.clinicalCase.findFirst({
    where: {
      id: clinicalCaseId as string,
    },
  })
}

////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------
// Credit Actions
//------------------------------------------------------------------------------

export const increaseCredit = async (newCredit: NewCredit) => {
  const data = CreditSchema.parse(newCredit)

  await prisma.credit.create({
    data: {
      mount: data.mount,
      patientId: data.patientId,
    },
  })
  revalidatePath('/patients/' + data.patientId, 'page')
}

////////////////////////////////////////////////////////////////////////////////
