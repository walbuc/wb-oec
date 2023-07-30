import Link from 'next/link'
import {PropsWithChildren} from 'react'
import '@/styles/globals.css'
import {Spacer} from '@/components/spacer'

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
          </nav>
        </header>
        <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-h1">Welcome back!</h1>
              <p className="text-body-md text-night-200">
                Please enter your details.
              </p>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
