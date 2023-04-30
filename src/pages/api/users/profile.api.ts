import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

// esse e uma router vai ser chamada para cadastrar os intervalos de tempo que o usuário tem disponibilidade.
// essa router nao foi feita para atualizar os dados de intervalos ela sera chamada apenas uma vez para o usuário cadastrar as informações
export default async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  // esse erro serve para mostrar caso o usuário nao esteja conectado
  if (!session) {
    return res.status(401).end
  }

  // o parse ele retorna todo tipado
  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  // await prisma.userTimeInterval.createMany

  return res.status(204).end()
}
