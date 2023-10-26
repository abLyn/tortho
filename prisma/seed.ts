import { PrismaClient } from '@prisma/client'
import { patients } from './patients'

const prisma = new PrismaClient()

async function main() {
  await prisma.patient.createMany({ data: patients })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
