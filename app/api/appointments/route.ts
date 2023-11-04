import { PaymentSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const appointments = await prisma.appointment.findMany()
  return NextResponse.json(appointments)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = AppointmentSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newAppointment = await prisma.appointment.create({
    data: {
      value: body.value,
      clinicalCaseId: body.clinicalCaseId,
    },
  })
  return NextResponse.json(newAppointment, { status: 201 })
}
