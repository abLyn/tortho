import { NextRequest, NextResponse } from 'next/server'
import schema from './schema'
import prisma from '@/prisma/PrismaClient'

import { z } from 'zod'

const createPatientSchema = z.object({
  firstname: z
    .string({
      required_error: 'Vous devez saisir un prenom',
      invalid_type_error: 'Le prenom doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),
  lastname: z
    .string({
      required_error: 'Vous devez saisir un nom',
      invalid_type_error: 'Le nom doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),
  dob: z
    .date({
      required_error: 'Vous devez saisir une date de naissance',
      invalid_type_error: 'Date non valide',
    })
    .min(new Date('1923-01-01'), { message: 'Trop vieux!' })
    .max(new Date(), { message: 'Trop jeune!' }),
  email: z
    .string({
      required_error: 'Vous devez saisir une adresse email',
      invalid_type_error: 'Adresse email non valide ',
    })
    .email({ message: 'Invalid email address' }),
  phone: z.string().min(9).max(10),
})

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
    return NextResponse.json(validation.error.errors, { status: 400 })
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
      phone: parseInt(body.phone),
      email: body.email,
      address: body.address,
      medicalHistory: body.medicalHistory,
    },
  })

  return NextResponse.json(newpatient, { status: 201 })
}
