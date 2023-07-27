'use client'
import {Button, Field} from '@/components/forms'
import {useAsync} from '@/hooks/useAsync'
import Link from 'next/link'
import {signin} from '@/lib/client'
import {useRouter} from 'next/navigation'

function getError(error: string | {error: string}) {
  return typeof error === 'string' ? error : error.error
}

export default function InlineLogin() {
  const {data, error, run, status} = useAsync()
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    run(signin({email, password})).then(() => router.push('/home'))
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
              Log in
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2 pt-6">
          <span className="text-night-200">New here?</span>
          <Link href="/register">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
