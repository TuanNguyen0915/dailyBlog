import prisma from "@/prisma/prismaDb"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
export const POST = async (req: Request) => {
  try {
    const formData = await req.json()
    let user = await prisma.user.findUnique({
      where: {
        email: formData.email.toLowerCase(),
      },
    })
    if (user) {
      return NextResponse.json({ error: "User already exists" })
    } else {
      user = await prisma.user.create({
        data: {
          email: formData.email.toLowerCase(),
          username: formData.email.split("@")[0],
          hashPassword: bcrypt.hashSync(formData.password, 10),
        },
      })
      return NextResponse.json({ user }, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
