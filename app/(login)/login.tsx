'use client'

import { Container, Input, Button } from '@/components'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const supabase = createClient()
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Error logging in:', error)
      } else {
        window.location.href = '/'
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(true)
      } else {
        window.location.href = '/'
      }
    }
  }

  return (
    <Container hasCols={false}>
      <div className="row-start-1 text-center text-2xl">
        <h1 className="mt-3 text-black">Improve your focus!</h1>
        <small className="text-gray-800">
          {mode === 'signin'
            ? 'sign in to continue to your account'
            : 'Get started with your new account'}
        </small>
        <div>
          <small>
            {mode === 'signup' && error
              ? 'Invalid e-mail, please try again'
              : ''}
          </small>
        </div>
      </div>
      <form
        className="row-start-2 justify-items-center space-y-3 px-2"
        onSubmit={handleSubmit}
      >
        <Input
          className="h-12 rounded-lg border-gray-200 bg-white px-4 shadow-sm transition-colors"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="h-12 rounded-lg border-gray-200 bg-white px-4 shadow-sm transition-colors"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label={mode === 'signin' ? 'Login' : 'Create'}
          style="bg-gray-800 h-12 px-5 hover:bg-gray-900"
          type="submit"
        />
        <div>
          <small>
            New to our platform?{' '}
            <Link
              href={mode === 'signin' ? '/sign-up' : '/sign-in'}
              className="text-blue-600 hover:text-blue-500"
            >
              {mode === 'signin' ? 'Create an account' : 'Sign in'}
            </Link>
          </small>
        </div>
      </form>
    </Container>
  )
}
