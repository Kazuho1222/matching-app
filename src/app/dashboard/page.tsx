import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      matches: true,
      sentLikes: true,
      receivedLikes: true,
    },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* プロフィールカード */}
        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
            <CardDescription>あなたのプロフィール情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm font-medium">性別</p>
                  <p className="text-sm text-muted-foreground">
                    {user.gender === 'MALE' ? '男性' :
                      user.gender === 'FEMALE' ? '女性' : 'その他'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">年齢</p>
                  <p className="text-sm text-muted-foreground">
                    {calculateAge(user.birthDate)}歳
                  </p>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/profile/edit">
                  プロフィールを編集
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 統計カード */}
        <Card>
          <CardHeader>
            <CardTitle>アクティビティ</CardTitle>
            <CardDescription>あなたのアクティビティ状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="マッチ数"
                value={user.matches.length}
                href="/matches"
              />
              <StatCard
                title="いいね！した数"
                value={user.sentLikes.length}
                href="/likes/sent"
              />
              <StatCard
                title="いいね！された数"
                value={user.receivedLikes.length}
                href="/likes/received"
              />
              <StatCard
                title="プロフィール完成度"
                value={calculateProfileCompletion(user)}
                suffix="%"
                href="/profile/edit"
              />
            </div>
          </CardContent>
        </Card>

        {/* おすすめユーザーカード */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>おすすめのユーザー</CardTitle>
            <CardDescription>あなたに合いそうな相手</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* おすすめユーザーは別コンポーネントとして実装予定 */}
              <p className="text-center text-muted-foreground col-span-full py-8">
                おすすめのユーザーを探しています...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  suffix = "",
  href
}: {
  title: string
  value: number
  suffix?: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">
            {value}{suffix}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

function calculateAge(birthDate: Date) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

function calculateProfileCompletion(user: any) {
  const profile = user.profile
  if (!profile) return 0

  const fields = [
    profile.height,
    profile.bodyType,
    profile.smoking,
    profile.drinking,
    profile.education,
    profile.income,
    profile.lookingFor,
    profile.hobbies.length > 0,
  ]

  const completedFields = fields.filter(Boolean).length
  return Math.round((completedFields / fields.length) * 100)
} 