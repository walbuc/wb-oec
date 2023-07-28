'use client'
import {Button, Field} from '@/components/forms'
import {useAsync} from '@/hooks/useAsync'
import Link from 'next/link'
import {signin} from '@/lib/client'
import {useRouter} from 'next/navigation'
import {ListOfErrors} from '@/components/forms'

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements
}

function getError(error: string | {error: string}) {
  return typeof error === 'string' ? error : error.error
}

function getFieldsErrors(error: any): {
  email: ListOfErrors
  password: ListOfErrors
} {
  if (error && error.errors) {
    if (error.errors.fieldErrors) {
      return {
        email: error.errors.fieldErrors.email,
        password: error.errors.fieldErrors.password,
      }
    }
  }
  return {email: [], password: []}
}

export default function InlineLogin() {
  const {error, run, status} = useAsync()
  const router = useRouter()
  const fields = getFieldsErrors(error)

  function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
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
            errors={fields.email}
          />

          <Field
            labelProps={{children: 'Password'}}
            inputProps={{
              name: 'password',
              autoComplete: 'password',
              type: 'password',
            }}
            errors={fields.password}
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
