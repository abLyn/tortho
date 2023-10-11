import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patients = await prisma.patient.findUnique({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json(patients)
}
