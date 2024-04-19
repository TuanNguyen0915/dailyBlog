"use server"
import prisma from "@/prisma/prismaDb"
import { revalidatePath } from "next/cache"
const DASHBOARD = "/dashboard"
export const createNewBlog = async (formData: any) => {
  const blog = await prisma.blog.create({
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
      id: blog.authorId,
    },
    data: {
      blogsIds: {
        push: blog.id,
      },
    },
  })
  revalidatePath(DASHBOARD)
  return user
}

export const updateBlog = async (blogId: string, formData: any) => {
  const updateBlog = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      title: formData.title,
      content: formData.content,
      imageCover: formData.imageCover,
      published: formData.published,
    },
  })
  revalidatePath(DASHBOARD)
  return updateBlog
}

export const deleteBlog = async (blogId: string) => {
  const blog = await prisma.blog.delete({
    where: {
      id: blogId,
    },
  })
  const user = await prisma.user.findUnique({
    where: {
      id: blog.authorId,
    },
  })
  const updatedUser = await prisma.user.update({
    where: {
      id: blog.authorId,
    },
    data: {
      blogsIds: {
        set: user?.blogsIds.filter((id) => id !== blogId),
      },
    },
  })
  revalidatePath(DASHBOARD)
  return updatedUser
}

export const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return blogs
}

export const getBlogsByAuthor = async (authorId: string) => {
  const blogs = await prisma.blog.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  if (!blogs) return null
  return blogs
}

export const getBlogById = async (blogId: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    include: {
      author: true,
    },
  })
  return blog
}

export const changePublishBlog = async (blogId: string, published: boolean) => {
  const blog = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      published: published,
    },
  })
  revalidatePath(DASHBOARD)
  return blog
}
