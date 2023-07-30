import {getTradeData} from '@/lib/client'
import type {Trade} from '@/lib/client'
import Link from 'next/link'
import TreeMap from '@/components/tree-map'
import {Spacer} from '@/components/spacer'
import Exports from './exports'
import {Suspense} from 'react'

type TradeProps = {
  id: string
  name: string
  year: string | undefined
}

export default async function Trade({id, name, year}: TradeProps) {
  // Parallec execution
  const importsPromise: Promise<Trade[]> = getTradeData({
    type: 'Importer',
    id,
    year,
  })
  const exportsPromise: Promise<Trade[]> = getTradeData({
    type: 'Exporter',
    id,
    year,
  })
  const [imports] = await Promise.all([importsPromise])

  return (
    <div className="flex-1">
      <div className="flex items-center justify-around">
        <div className="text-3xl">{name}</div>
        <div className="text-2xl">
          <Link href="/home">Back</Link>
        </div>
      </div>
      <Spacer size="4xs" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-body-lg text-night-200">Imports</p>
      </div>
      <Spacer size="3xs" />
      <TreeMap data={imports} />
      <Spacer size="3xs" />
      <Suspense fallback={null}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body-lg text-night-200">Exports</p>
        </div>
        <Spacer size="3xs" />
        {/* <div className="max-w-3xl"> */}
        <Exports promise={exportsPromise} />
      </Suspense>
      {/* </div> */}
    </div>
  )
}
