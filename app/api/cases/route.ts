import { ClinicalCaseSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const clinicalCases = await prisma.clinicalCase.findMany()
  return NextResponse.json(clinicalCases)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = ClinicalCaseSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newClinicalCase = await prisma.clinicalCase.create({
    data: {
      title: body.title,
      patientId: body.patientId,
    },
  })
  return NextResponse.json(newClinicalCase, { status: 201 })
}
