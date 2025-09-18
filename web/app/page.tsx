import { createClient } from '@supabase/supabase-js'
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export default async function Home(){
const { data } = await client.from('event_update').select('*').order('occurred_at', { ascending:false }).limit(20)
return (
<main className="mx-auto max-w-3xl p-6">
<h1 className="text-2xl font-bold">その後どうなった？（MVP）</h1>
<ul className="mt-4 space-y-3">
{(data||[]).map((u)=> (
<li key={u.id} className="rounded-xl border p-4">
<div className="text-sm opacity-70">{u.occurred_at ?? u.published_at}</div>
<div className="font-semibold">{u.headline}</div>
<div className="text-sm">{u.summary}</div>
</li>
))}
</ul>
</main>
)
}