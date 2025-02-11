import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

interface distractionsDTO {
  id: string
  user_id: string
  content: string
}

export async function GET() {
  const supabase = createClient()
  const userId = 'aea5f42f-d6e4-4cec-b0a0-4b73ce9a8bce'
  const { data, error } = await supabase
    .from('distractions')
    .select('id, user_id, content')
    .eq('user_id', userId)

  if (error) console.log(error)
  const distractions = data as distractionsDTO[]
  console.log(distractions)
  return NextResponse.json({ message: 'Distractions fetched' }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const { userId, distractions } = await req.json()

  if (!distractions || !userId) {
    return NextResponse.json(
      { message: 'Missing content or user_id' },
      { status: 400 },
    )
  }

  const supabase = createClient()
  distractions.map(async (distraction: string) => {
    const { error } = await supabase
      .from('distractions')
      .insert([{ user_id: userId, content: distraction }])

    if (error)
      return NextResponse.json({ message: error.message }, { status: 500 })
  })

  return NextResponse.json({ message: 'Distractions saved' }, { status: 200 })
}
