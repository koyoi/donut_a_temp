// web/app/event/[id]/page.tsx
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { WatchButton } from './WatchButton'

export default async function EventPage({ params }:{ params:{ id:string } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const id = Number(params.id)

  const { data: ev } = await supabase.from('event').select('*').eq('id', id).single()
  const { data: updates } = await supabase.from('event_update')
    .select('*').eq('event_id', id).order('occurred_at', { ascending:false }).limit(50)

  // サーバー側でログイン判定したい場合は、Next/Supabaseのサーバークライアントに切替可
  const { data: { user } } = await supabase.auth.getUser()
  let watching = false
  if (user) {
    const { data: w } = await supabase.from('user_watch')
      .select('id').eq('user_id', user.id).eq('kind','event').eq('target_id', id).maybeSingle()
    watching = !!w
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">{ev?.title}</h2>
      <WatchButton eventId={id} initialWatching={watching} />
      <section className="space-y-3">
        {(updates||[]).map(u=>(
          <article key={u.id} className="border rounded p-3">
            <div className="text-xs opacity-60">{u.occurred_at ?? u.published_at}</div>
            <div className="font-semibold">{u.headline}</div>
            <p className="text-sm">{u.summary}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
