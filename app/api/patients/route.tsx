import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'

import { PatientSchema } from '../../validationSchemas'

//-----------------------------------------------------------------------------
export async function GET() {
  const patients = await prisma.patient.findMany()

  return NextResponse.json(patients)
}
//-----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = PatientSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const patient = await prisma.patient.findFirst({
    where: {
      AND: [
        { firstname: body.firstname },
        { lastname: body.lastname },
        { dob: body.dob },
      ],
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
    },
  })

  return NextResponse.json(newpatient, { status: 201 })
}
