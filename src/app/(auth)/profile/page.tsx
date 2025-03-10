"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    if (session) {
      // ユーザー情報を取得
      setUserData({
        name: session.user.name || "",
        email: session.user.email || "",
      })
    }
  }, [session])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // ユーザー情報を更新するためのAPI呼び出しを行う
    // ここにAPI呼び出しのロジックを追加
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">プロフィール</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit">更新</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 