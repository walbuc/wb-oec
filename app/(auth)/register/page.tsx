'use client'
import {
  Button,
  Field,
  //getFieldsFromSchema,
  //preprocessFormData,
} from '@/components/forms'
import {useAsync} from '@/hooks/useAsync'
import {register} from '@/lib/client'

import {useRouter} from 'next/navigation'

function getError(error: string | {error: string}) {
  return typeof error === 'string' ? error : error.error
}

export default function InlineRegister() {
  const {data, error, run, status} = useAsync()
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    run(register({email, password})).then(() => {
      router.push('/home')
    })
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-md px-8">
        <form method="POST" name="login" onSubmit={handleSubmit}>
          <Field
            labelProps={{children: 'Email'}}
            inputProps={{
              name: 'email',
              autoComplete: 'email',
            }}
          />
          <Field
            labelProps={{children: 'Password'}}
            inputProps={{
              name: 'password',
              autoComplete: 'password',
              type: 'password',
            }}
          />
          {error && getError(error)}
          <div className="flex items-center justify-between gap-6 pt-3">
            <Button
              className="w-full"
              size="md"
              variant="primary"
              status={status === 'pending' ? 'pending' : status ?? 'idle'}
              type="submit"
              disabled={status !== 'idle'}
            >
              Create an account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
