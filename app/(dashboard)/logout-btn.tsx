'use client'
import {logout} from '../actions'
import {Button} from '@/components/forms'
import {useRouter, redirect} from 'next/navigation'
import {useTransition} from 'react'

function Logout() {
  let [isPending, startTransition] = useTransition()

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await logout()
          redirect('/signin')
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
