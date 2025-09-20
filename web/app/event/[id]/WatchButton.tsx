// web/app/event/[id]/WatchButton.tsx
'use client'
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function WatchButton({ eventId, initialWatching }:{ eventId:number, initialWatching:boolean }) {
  async function toggle() {
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return alert('ログインしてください')
    if (initialWatching) {
      await sb.from('user_watch').delete().eq('user_id', user.id).eq('kind','event').eq('target_id', eventId)
      location.reload()
    } else {
      await sb.from('user_watch').insert({ user_id: user.id, kind:'event', target_id: eventId })
      location.reload()
    }
  }
  return (
    <button onClick={toggle} className="px-3 py-1 rounded border">
      {initialWatching ? 'フォロー中（やめる）' : 'フォローする'}
    </button>
  )
}
