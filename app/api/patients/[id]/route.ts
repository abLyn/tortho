import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patient = await prisma.patient.findUnique({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json(patient)
}
//----------------------------------------------------------------

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patient = await prisma.patient.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!patient)
    return NextResponse.json({ error: 'patient not found' }, { status: 404 })

  await prisma.patient.delete({
    where: {
      id: patient.id,
    },
  })
  return NextResponse.json({ message: 'patient deleted successfully!' })
}
