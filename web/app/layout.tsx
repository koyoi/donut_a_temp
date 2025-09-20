// web/app/layout.tsx（一例）
import { AuthButtons } from './_components/AuthButtons'
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="ja"><body>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="font-bold">その後どうなった？</h1>
        <AuthButtons />
      </header>
      {children}
    </body></html>
  )
}
