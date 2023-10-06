import { NextRequest, NextResponse } from 'next/server'
import schema from '../schema'
import prisma from '@/prisma/PrismaClient'

//----------------------------------------------------------------------------
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  })

  if (!patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  return NextResponse.json(patient)
}

//----------------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  })

  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  if (!patient)
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

  const updatedPatient = await prisma.patient.update({
    where: { id: patient.id },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
    },
  })

  return NextResponse.json(updatedPatient)
}

//----------------------------------------------------------------------------
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  })

  if (!patient)
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

  await prisma.patient.delete({
    where: patient,
  })

  return NextResponse.json('Patient was deleted successfully')
}
