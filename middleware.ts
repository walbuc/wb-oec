import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {jwtVerify} from 'jose'
const PUBLIC_FILE = /\.(.*)$/

const verifyJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode('somesecretevaluejwt'),
  )

  return payload
}

export default async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const jwt = req.cookies.get('__cookie_custom_name')
  console.log(jwt)

  if (!jwt) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }

  try {
    await verifyJWT(jwt.value)
    if (pathname === '/') {
      req.nextUrl.pathname = '/home'
      return NextResponse.redirect(req.nextUrl)
    }
    return NextResponse.next()
  } catch (e) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }
}
