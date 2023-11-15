import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'
import { PatientSchema } from '@/app/validationSchemas'

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

//----------------------------------------------------------------

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = PatientSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const patient = await prisma.patient.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!patient)
    return NextResponse.json({ error: 'Invalid patient' }, { status: 404 })

  const updatedPatient = await prisma.patient.update({
    where: { id: patient.id },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      dob: body.dob,
      gender: body.gender,
      phone: body.phone,
      email: body.email,
      address: body.address,
      medicalHistory: body.medicalHistory,
    },
  })
  return NextResponse.json(updatedPatient)
}
