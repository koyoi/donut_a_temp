// web/app/_components/AuthButtons.tsx
'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AuthButtons() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
    })

  async function signOut() {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <div className="flex items-center gap-2">
      {!sent ? (
        <>
          <input className="border p-1 rounded" placeholder="メールアドレス"
            value={email} onChange={e=>setEmail(e.target.value)} />
          <button onClick={signIn} className="px-3 py-1 rounded bg-black text-white">ログイン</button>
        </>
      ) : (
        <span className="text-sm">メールのリンクを確認してください</span>
      )}
      <button onClick={signOut} className="px-3 py-1 rounded border">ログアウト</button>
    </div>
  )
}
