'use server'

import { auth, signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

// runtimeの設定は削除

const registerSchema = z.object({
  name: z.string().min(2, "名前は2文字以上必要です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "性別を選択してください",
  }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "生年月日を入力してください"),
})

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      gender: formData.get('gender'),
      birthDate: formData.get('birthDate'),
    }

    const validatedFields = registerSchema.safeParse(rawData)

    if (!validatedFields.success) {
      const errors = validatedFields.error.issues.map(issue => issue.message)
      throw new Error(errors.join(', '))
    }

    const { name, email, password, gender, birthDate } = validatedFields.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error("このメールアドレスは既に登録されています")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        birthDate: new Date(birthDate),
        interests: [],
        image: "/images/default-avatar.svg",
      },
    })

    if (!user) {
      throw new Error("ユーザーの作成に失敗しました")
    }

    return await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false
    })
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "アカウント作成に失敗しました" }
  }
}

export async function setupProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("認証が必要です")
  }

  const rawData = {
    height: formData.get('height'),
    bodyType: formData.get('bodyType'),
    smoking: formData.get('smoking'),
    drinking: formData.get('drinking'),
    education: formData.get('education'),
    income: formData.get('income'),
    hobbies: formData.get('hobbies'),
    lookingFor: formData.get('lookingFor'),
  }

  const profileSchema = z.object({
    height: z.string().transform(val => val ? Number.parseInt(val) : null),
    bodyType: z.string().nullable(),
    smoking: z.string().transform(val => val === 'true'),
    drinking: z.string().transform(val => val === 'true'),
    education: z.string(),
    income: z.string(),
    hobbies: z.string().transform(val => val ? val.split(',').map(h => h.trim()) : []),
    lookingFor: z.string().nullable(),
  })

  try {
    const validatedFields = profileSchema.parse(rawData)

    await prisma.profile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        ...validatedFields,
      },
      create: {
        userId: session.user.id,
        ...validatedFields,
      },
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error("入力内容を確認してください")
    }
    throw new Error("プロフィールの設定に失敗しました")
  }
}

// 管理者用: 既存のユーザーのデフォルトアバターを更新する関数
export async function updateDefaultAvatars() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("認証が必要です")
  }

  try {
    // 管理者権限チェックなどが必要な場合はここに追加

    await prisma.user.updateMany({
      where: {
        OR: [
          { image: null },
          { image: "/default-avatar.png" },
          { image: "/images/default-avatar.png" }
        ]
      },
      data: {
        image: "/images/default-avatar.svg"
      }
    })

    return { success: true, message: "デフォルトアバターを更新しました" }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("アバターの更新に失敗しました")
  }
} 