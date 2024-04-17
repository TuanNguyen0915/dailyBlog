import prisma from "@/prisma/prismaDb"
import { useParams } from "next/navigation"
import { NextResponse } from "next/server"

export const PUT = async (
  req: Request,
  { params }: { params: { blogId: string } },
) => {
  try {
    const formData = await req.json()
    const blog = await prisma.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title: formData.title,
        content: formData.content,
        imageCover: formData.imageCover,
        published: formData.published,
        authorId: formData.authorId,
      },
    })
    return NextResponse.json({ blog }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
