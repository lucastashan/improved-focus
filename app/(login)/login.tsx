'use client'

import { Container, Input, Button } from '@/components'
import { createClient } from '@supabase/supabase-js'
// import Link from 'next/link'
import { useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error('Error logging in:', error)
    } else {
      console.log(data)
      window.location.href = '/'
    }
  }

  return (
    <Container>
      <div className="col-start-2 row-start-1 text-center text-2xl">
        <h1 className="mt-3 text-black">Improve your focus!</h1>
        <small className="text-gray-800">
          sign in to continue to your account
        </small>
      </div>
      <form
        className="col-start-2 row-start-2 justify-items-center space-y-3"
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
          label="Login"
          style="bg-gray-800 h-12 px-5 hover:bg-gray-900"
          type="submit"
        />
        <div>
          <small>
            New to our platform?{' '}
            <a className="text-blue-600 hover:text-blue-500">
              Create an account
            </a>
            {/* <Link href={'/'} className="text-blue-600 hover:text-blue-500">
              Create an account
            </Link> */}
          </small>
        </div>
      </form>
    </Container>
  )
}
