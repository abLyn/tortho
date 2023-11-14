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
