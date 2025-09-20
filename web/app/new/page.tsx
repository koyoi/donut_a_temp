// web/app/new/page.tsx
'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function NewEvent() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  async function submit() {
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return setMsg('ログインしてください')
    const { error } = await sb.from('event').insert({
      title, description: desc, created_by: user.id
    })
    setMsg(error ? `エラー: ${error.message}` : '作成しました')
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">出来事を登録</h2>
      <input className="w-full border p-2 rounded" placeholder="タイトル" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded" placeholder="概要/補足" value={desc} onChange={e=>setDesc(e.target.value)} />
      <button onClick={submit} className="px-4 py-2 rounded bg-black text-white">保存</button>
      {msg && <div className="text-sm">{msg}</div>}
    </main>
  )
}
