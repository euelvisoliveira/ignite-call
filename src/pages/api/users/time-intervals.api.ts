import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

// esse e uma router vai ser chamada para cadastrar os intervalos de tempo que o usuário tem disponibilidade.
// essa router nao foi feita para atualizar os dados de intervalos ela sera chamada apenas uma vez para o usuário cadastrar as informações
export default async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
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

  console.log('req.body:', req.body)

  // o parse ele retorna todo tipado
  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  console.log('intervals:', intervals)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  // await prisma.userTimeInterval.createMany

  return res.status(201).end()
}
