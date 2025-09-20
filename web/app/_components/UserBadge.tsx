// web/app/_components/UserBadge.tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient, User } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function UserBadge() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 起動時に現在セッションを取得
    sb.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    // ログイン/ログアウトをリアルタイム反映
    const { data: sub } = sb.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!user) return <span className="text-sm opacity-70">未ログイン</span>
  return (
    <span className="text-sm">
      ログイン中：<span className="font-medium">{user.email}</span>
    </span>
  )
}
