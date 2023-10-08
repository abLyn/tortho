import prisma from '@/prisma/PrismaClient'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const schema = z.object({
  username: z.string().min(5),
  password: z.string().min(2),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = schema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { username: body.username },
  })

  if (user) {
    NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    const password = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        password,
      },
    })

    return NextResponse.json({ username: newUser.username }, { status: 201 })
  }
}
