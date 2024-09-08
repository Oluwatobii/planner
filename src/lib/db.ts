import { PrismaClient } from '@prisma/client'

/* add prisma to the NodeJS global type */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient // This must be a `var` and not a `let / const`
}

/* Prevent multiple instances of Prisma Client in development */
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  prisma.$connect()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
    global.prisma.$connect()
  }
  prisma = global.prisma
}

export { prisma }
