import bcrypt from 'bcrypt'
import {SignJWT, jwtVerify} from 'jose'
import {db} from './db'
import type {User} from '@prisma/client'
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import {redirect} from 'next/navigation'
// Sign it
export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({payload: {id: user.id, email: user.email}})
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

// Validate a JWT:
export const validateJWT = async (jwt: string) => {
  try {
    const {payload} = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET),
    )

    return payload.payload as any
  } catch (error) {
    redirect('/signin')
  }
}

// Getting the JWT from cookies:
export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME!)
  if (!jwt) {
    redirect('/signin')
  } else {
    const {id} = await validateJWT(jwt!.value)

    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    })

    return user
  }
}

const hashPassword = (password: string) => bcrypt.hash(password, 10)

const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword)

export {hashPassword, comparePasswords}
