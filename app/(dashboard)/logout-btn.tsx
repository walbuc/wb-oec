'use client'
import {logout} from '../actions'
import {Button} from '@/components/forms'
import {useRouter} from 'next/navigation'
import {useTransition} from 'react'

function Logout() {
  let [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await logout()
          router.replace('/signin')
        })
      }
      size="sm"
      variant="primary"
    >
      Log out
    </Button>
  )
}

export default Logout
