'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { registerUser } from "@/lib/actions"
import { useRouter } from "next/navigation"
import React from "react"

export default function RegisterPage() {
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    try {
      const result = await registerUser(formData)
      if (result?.success) {
        router.push('/login?registered=true')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("アカウント作成に失敗しました")
      }
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">アカウント作成</CardTitle>
          <CardDescription>
            必要な情報を入力して、アカウントを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                name="name"
                placeholder="山田 太郎"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="8文字以上で入力してください"
              />
              <p className="text-sm text-muted-foreground">
                パスワードは8文字以上で入力してください
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">性別</Label>
              <Select name="gender" required>
                <SelectTrigger>
                  <SelectValue placeholder="性別を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">男性</SelectItem>
                  <SelectItem value="FEMALE">女性</SelectItem>
                  <SelectItem value="OTHER">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">生年月日</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              アカウント作成
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 