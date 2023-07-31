import {NextApiRequest, NextApiResponse} from 'next'
import {db} from '@/lib/db'
import {serialize} from 'cookie'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    'Set-Cookie',
    serialize(process.env.COOKIE_NAME!, '', {
      httpOnly: true,
      path: '/home',
      maxAge: 60 * 60 * 24 * 7,
    }),
  )
  res.status(201)
  res.end()
}
