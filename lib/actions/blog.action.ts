import prisma from "@/prisma/prismaDb"
import axios from "axios"
import exp from "constants"

export const createNewBlog = async (formData: any) => {
  const { data } = await axios.post("/api/blog", formData)
  return data
}

export const updateBlog = async (blogId: string, formData: any) => {
  const data = await axios.put(`/api/blog/edit/${blogId}`, formData)
  return data
}

export const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
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
