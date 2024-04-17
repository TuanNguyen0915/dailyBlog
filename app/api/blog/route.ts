import prisma from "@/prisma/prismaDb"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const formData = await req.json()
  try {
    const newPost = await prisma.blog.create({
      data: {
        title: formData.title,
        content: formData.content,
        imageCover: formData.imageCover,
        published: formData.published,
        authorId: formData.authorId,
      },
    })
    const user = await prisma.user.update({
      where: {
        id: newPost.authorId,
      },
      data: {
        blogsIds: {
          push: newPost.id,
        },
      },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
