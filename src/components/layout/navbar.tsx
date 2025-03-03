"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signOut as authSignOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { data: session, status } = useSession()
  console.log("Auth Status:", status, session)
  const isLoggedIn = status === "authenticated"
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const isRegisterPage = pathname === "/register"

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="font-bold">
          Matching App
        </Link>

        {isLoggedIn && (
          <div className="ml-10 hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              ダッシュボード
            </Link>
            <Link href="/matches" className="text-sm font-medium hover:text-primary">
              マッチング
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:text-primary">
              メッセージ
            </Link>
          </div>
        )}

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />

          {isLoggedIn ? (
            <Button
              onClick={() => authSignOut({ callbackUrl: "/" })}
              variant="ghost"
            >
              ログアウト
            </Button>
          ) : (
            <>
              {!isLoginPage && (
                <Button asChild variant="ghost">
                  <Link href="/login">ログイン</Link>
                </Button>
              )}

              {!isRegisterPage && (
                <Button asChild>
                  <Link href="/register">新規登録</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 