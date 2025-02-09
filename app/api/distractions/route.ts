import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

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
