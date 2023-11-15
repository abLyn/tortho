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
  const body = await request.json()

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
      start: body.newStart,
      end: body.newEnd,
    },
  })
  return NextResponse.json(updatedAppointment)
}
