"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signOut as authSignOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function Navbar() {
  const { data: session, status } = useSession()
  console.log("Auth Status:", status, session)
  const isLoggedIn = status === "authenticated"
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const isRegisterPage = pathname === "/register"

  // ドロップダウンメニューの状態管理
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // ドロップダウンメニューのドグル
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

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
            <>
              <Avatar>
                <AvatarImage src={session.user?.image || "/default-avatar.png"} onClick={toggleDropdown} className="w-10 h-10 rounded-full cursor-pointer" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* ドロップダウンメニュー */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{session.user?.name}</div>
                    <div className="font-medium truncate">{session.user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ダッシュボード</Link>
                    </li>
                    <li>
                      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">設定</Link>
                    </li>
                    <li>
                      <Link href="/earnings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">収入</Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Button
                      onClick={() => {
                        authSignOut({ callbackUrl: "/" })
                        setIsDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      ログアウト
                    </Button>
                  </div>
                </div>
              )}
            </>
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