import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const schema = z.object({
  name: z.string().min(5),
  password: z.string().min(2),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = schema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { name: body.name },
  })

  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    const password = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.user.create({
      data: {
        name: body.name.toLowerCase(),
        password,
      },
    })

    return NextResponse.json({ name: newUser.name }, { status: 201 })
  }
}
