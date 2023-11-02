import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/PrismaClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const clinicalCase = await prisma.clinicalCase.findUnique({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json(clinicalCase)
}
