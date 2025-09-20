// web/app/layout.tsx（一例）
import { AuthButtons } from './_components/AuthButtons'
import { UserBadge } from './_components/UserBadge'


export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
  <header className="flex items-center justify-between p-4 border-b">
    <h1 className="font-bold">その後どうなった？</h1>
    <div className="flex items-center gap-3">
      <UserBadge />
      <AuthButtons />
    </div>
  </header>

  <html lang="ja"><body>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="font-bold">その後どうなった？</h1>
        <AuthButtons />
      </header>
      {children}
    </body></html>
  )
}
