// web/app/my/page.tsx
import { createClient } from '@supabase/supabase-js'

export default async function MyFeed() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <main className="p-6">ログインしてください</main>

  // 自分がフォロー中の event_id を取る
  const { data: watches } = await supabase
    .from('user_watch').select('target_id').eq('user_id', user.id).eq('kind','event')
  const ids = (watches||[]).map(w=>w.target_id)
  if (ids.length === 0) return <main className="p-6">フォロー中の出来事はまだありません</main>

  // それらの event_update をまとめて取得
  const { data: updates } = await supabase
    .from('event_update')
    .select('*, event(title)')
    .in('event_id', ids)
    .order('occurred_at', { ascending:false })
    .limit(100)

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">フォロー中の続報</h2>
      {(updates||[]).map(u=>(
        <article key={u.id} className="border rounded p-3">
          <div className="text-xs opacity-60">{u.occurred_at ?? u.published_at}</div>
          <div className="font-semibold">{u.event?.title} — {u.headline}</div>
          <p className="text-sm">{u.summary}</p>
        </article>
      ))}
    </main>
  )
}
