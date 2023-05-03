import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], // essa opção de log, vai fazer automaticamente o log de todos sql executados no banco de dados
})
