import {Spacer} from '@/components/spacer'
import {Suspense} from 'react'
import ComponentTEst from './componentServer'

export default function Home({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  console.log(searchParams)
  return (
    <div className="flex-1">
      <Spacer size="2xl" />
      <main>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body-lg text-night-200">Explore the universe</p>
          <h1 className="text-h1 tracking-wide">
            Find trade data in outer space
          </h1>
        </div>
        <Spacer size="lg" />
        <div className="container m-auto mt-12">
          <Suspense fallback="Loading data...">
            <ComponentTEst />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
