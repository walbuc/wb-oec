'use client'
import {logout} from '../actions'
import {ButtonLink, Button} from '@/components/forms'
import {useTransition} from 'react'

function Logout() {
  let [isPending, startTransition] = useTransition()

  return (
    <Button
      onClick={() => startTransition(() => logout())}
      size="sm"
      variant="primary"
    >
      Log out
    </Button>
  )
}

export default Logout
