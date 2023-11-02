import { PaymentSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const payments = await prisma.payment.findMany()
  return NextResponse.json(payments)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = PaymentSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newPayment = await prisma.payment.create({
    data: {
      value: body.value,
      clinicalCaseId: body.clinicalCaseId,
    },
  })
  return NextResponse.json(newPayment, { status: 201 })
}
