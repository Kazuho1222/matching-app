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
import { Textarea } from "@/components/ui/textarea"
import { setupProfile } from "@/lib/actions"
import { useRouter } from "next/navigation"
import React from "react"

export default function ProfileSetupPage() {
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    try {
      await setupProfile(formData)
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("プロフィールの設定に失敗しました")
      }
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">プロフィール設定</CardTitle>
          <CardDescription>
            より詳細なプロフィール情報を入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">身長 (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="170"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyType">体型</Label>
                <Select name="bodyType">
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SLIM">スリム</SelectItem>
                    <SelectItem value="AVERAGE">普通</SelectItem>
                    <SelectItem value="ATHLETIC">筋肉質</SelectItem>
                    <SelectItem value="CHUBBY">ぽっちゃり</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smoking">喫煙</Label>
                <Select name="smoking">
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">吸う</SelectItem>
                    <SelectItem value="false">吸わない</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="drinking">飲酒</Label>
                <Select name="drinking">
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">飲む</SelectItem>
                    <SelectItem value="false">飲まない</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">最終学歴</Label>
              <Select name="education">
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">高校卒</SelectItem>
                  <SelectItem value="COLLEGE">専門学校卒</SelectItem>
                  <SelectItem value="UNIVERSITY">大学卒</SelectItem>
                  <SelectItem value="GRADUATE">大学院卒</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">年収</Label>
              <Select name="income">
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNDER_3M">300万円未満</SelectItem>
                  <SelectItem value="3M_TO_5M">300-500万円</SelectItem>
                  <SelectItem value="5M_TO_7M">500-700万円</SelectItem>
                  <SelectItem value="7M_TO_10M">700-1000万円</SelectItem>
                  <SelectItem value="OVER_10M">1000万円以上</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hobbies">趣味（カンマ区切りで入力）</Label>
              <Input
                id="hobbies"
                name="hobbies"
                placeholder="読書,映画鑑賞,旅行"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lookingFor">求めるパートナー像</Label>
              <Textarea
                id="lookingFor"
                name="lookingFor"
                placeholder="理想のパートナー像を記入してください"
                rows={4}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              プロフィールを設定
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 