'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'


const sb = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export default function AuthCallback(){
const router = useRouter()
useEffect(() => {
(async () => {
try {
// OAuth(Code) / Email OTP どちらでも安全にセッションを確立
await sb.auth.exchangeCodeForSession(window.location.href)
} catch {}
const { data: { session } } = await sb.auth.getSession()
router.replace(session ? '/' : '/?login=failed')
})()
}, [router])


return <main className="p-6">サインイン処理中…</main>
}
