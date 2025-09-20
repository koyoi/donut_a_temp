'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AuthButtons() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const signIn = async () => {
    setLoading(true)
    setMsg(null)
    try {
      if (!email) {
        setMsg('メールアドレスを入力してください')
        return
      }
      const redirectTo = `${window.location.origin}/auth/callback`
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      })
      if (error) throw error
      setSent(true)
      setMsg('確認メールを送信しました。受信箱をチェックしてください。')
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'サインインに失敗しました'
      setMsg(message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      // セッション破棄後にリロード
      window.location.reload()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {!sent ? (
        <>
          <input
            className="border p-1 rounded"
            placeholder="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={signIn}
            disabled={loading}
            className="px-3 py-1 rounded bg-black text-white disabled:opacity-50"
          >
            {loading ? '送信中…' : 'ログイン'}
          </button>
        </>
      ) : (
        <span className="text-sm">メールのリンクを確認してください</span>
      )}
      <button
        onClick={signOut}
        disabled={loading}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        ログアウト
      </button>
      {msg && <div className="text-sm ml-2 opacity-80">{msg}</div>}
    </div>
  )
}
