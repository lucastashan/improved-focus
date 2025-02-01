import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET(req: NextRequest) {
  // const authHeader = req.headers.get('authorization')
  // const token = authHeader?.replace('Bearer ', '') || ''

  // if (!userId) {
  //   return NextResponse.json({ message: 'Missing user_id' }, { status: 400 })
  // }

  const supabase = createClient()
  const { data: userData, error: authError } =
    await supabase.auth.getUser(token)
  console.log(userData)
  if (authError || !userData?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  // const { data, error } = await supabase
  //   .from('distractions')
  //   .select('content')
  //   .eq('user_id', userId)

  // if (error)
  //   return NextResponse.json({ message: error.message }, { status: 500 })

  // return NextResponse.json(data, { status: 200 })
  return NextResponse.json(
    { message: 'Distractions retrieved' },
    { status: 200 },
  )
}

export async function POST(req: NextRequest) {
  const { user_id: userId, content } = await req.json()
  console.log(userId)

  if (!content || !userId) {
    return NextResponse.json(
      { message: 'Missing content or user_id' },
      { status: 400 },
    )
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('distractions')
    .insert([{ user_id: userId, content }])

  console.log(error)

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 })

  return NextResponse.json({ message: 'Distraction saved' }, { status: 200 })
}
