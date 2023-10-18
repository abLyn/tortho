import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'

import { createPatientSchema } from '../../validationSchemas'

//-----------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  const patients = await prisma.patient.findMany()

  return NextResponse.json(patients)
}
//-----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = createPatientSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const patient = await prisma.patient.findFirst({
    where: {
      AND: [{ firstname: body.firstname }, { lastname: body.lastname }],
    },
  })

  if (patient) {
    return NextResponse.json(
      { error: 'patient already exists' },
      { status: 400 }
    )
  }

  const newpatient = await prisma.patient.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      dob: body.dob,
      gender: body.gender,
      phone: body.phone,
      email: body.email,
      address: body.address,
      medicalHistory: body.medicalHistory,
      image: body.image,
    },
  })

  return NextResponse.json(newpatient, { status: 201 })
}
