import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
          Matching App
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/login">ログイン</Link>
          </Button>
          <Button asChild>
            <Link href="/register">新規登録</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
} 