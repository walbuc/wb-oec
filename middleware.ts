import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
// works at edge runtime web workers
import {jwtVerify} from 'jose'
const PUBLIC_FILE = /\.(.*)$/

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
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
  //we validate here if we have alrearya token in the coockie session
  const jwt = req.cookies.get('__cookie_custom_name')
  // go away
  if (!jwt) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }

  try {
    await verifyJWT(jwt.value)
    // here you go
    return NextResponse.next()
  } catch (e) {
    console.error(e)
    req.nextUrl.pathname = '/signin'
    // go away
    return NextResponse.redirect(req.nextUrl)
  }
}
