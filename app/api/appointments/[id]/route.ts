import { AppointmentSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!appointment)
    return NextResponse.json(
      { error: 'appointment not found' },
      { status: 404 }
    )

  await prisma.appointment.delete({
    where: {
      id: appointment.id,
    },
  })
  return NextResponse.json({ message: 'appointment deleted successfully!' })
}
//----------------------------------------------------------------

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id)
  const body = await request.json()
  const validation = AppointmentSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 })

  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      start: body.start,
      end: body.end,
    },
  })
  return NextResponse.json(updatedAppointment)
}
