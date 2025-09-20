// web/app/search/page.tsx
'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function SearchPage(){
  const [q, setQ] = useState('')
  const [res, setRes] = useState<any[]>([])
  async function run(){
    const { data } = await sb.from('event')
      .select('id,title,description').ilike('title', `%${q}%`).limit(20)
    setRes(data||[])
  }
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">出来事を探す</h2>
      <div className="flex gap-2">
        <input className="flex-1 border p-2 rounded" value={q} onChange={e=>setQ(e.target.value)} placeholder="キーワード" />
        <button onClick={run} className="px-3 py-2 rounded bg-black text-white">検索</button>
      </div>
      <ul className="space-y-2">
        {res.map(e=>(
          <li key={e.id} className="border rounded p-2">
            <a href={`/event/${e.id}`} className="font-semibold underline">{e.title}</a>
            <div className="text-sm opacity-70">{e.description}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
