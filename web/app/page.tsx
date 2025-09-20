import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data } = await supabase
    .from('event_update')
    .select('headline, summary, occurred_at')
    .order('occurred_at', { ascending: false })
    .limit(10)

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">その後どうなった？（MVP）</h1>
      <ul className="space-y-3">
        {(data || []).map((u, i) => (
          <li key={i} className="border rounded-lg p-3">
            <div className="text-xs opacity-60">{u.occurred_at}</div>
            <div className="font-semibold">{u.headline}</div>
            <p className="text-sm">{u.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
