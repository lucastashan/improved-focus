import { createClient } from './client'

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut({ scope: 'local' })
  window.location.reload()
}
