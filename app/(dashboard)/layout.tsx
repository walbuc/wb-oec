import Link from 'next/link'
import {PropsWithChildren} from 'react'
import '@/styles/globals.css'
import {ButtonLink} from '@/components/forms'

export default function DashboardRootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en" className={'dark h-full'}>
      <head />
      <body className="flex h-full flex-col justify-between bg-slate-800 text-white">
        <header className="container mx-auto py-6">
          <nav className="flex justify-between">
            <Link href={'/'}>
              <div className="font-light text-accent-yellow">OEC</div>
              <div className="font-bold text-accent-yellow">Data</div>
            </Link>
            <div className="flex items-center gap-10">
              <ButtonLink href="/login" size="sm" variant="primary">
                Log In
              </ButtonLink>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
