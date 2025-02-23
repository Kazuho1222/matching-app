import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import * as z from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  birthDate: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = registerSchema.parse(json)

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "このメールアドレスは既に登録されています" }),
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)
    const birthDate = new Date(body.birthDate)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        gender: body.gender,
        birthDate: birthDate,
      },
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力データが無効です", details: error.errors },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { error: "内部サーバーエラー" },
      { status: 500 }
    )
  }
} 