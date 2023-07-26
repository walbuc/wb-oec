'use client'
import {useSearchParams, usePathname} from 'next/navigation'
import {useRouter} from 'next/router'
import {useCallback} from 'react'

export default function Selector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <select
      onChange={() =>
        router.push(pathname + '?' + createQueryString('Year', '2018'))
      }
    >
      <option value={2020}>2020</option>
      <option value={2019}>2019</option>
    </select>
  )
}
