'use client'
import {Treemap} from 'd3plus-react'

export default function TreeMap({data = []}) {
  console.log(data)
  const total = data.map(a => {
    return {
      id: a['HS2 ID'],
      value: a['Trade Value'],
      name: a['HS2'],
    }
  })

  const config = {
    groupBy: 'id',
    data: total,
    size: d => d.value,
  }
  return <Treemap config={config} />
}
