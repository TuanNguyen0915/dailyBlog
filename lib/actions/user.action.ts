"use server"

import prisma from "@/prisma/prismaDb"


export const getCurrentUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    include: {
      blogs: true,
    },
  })
  return user
}

export const getAllUser = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      blogs: true,
    },
  })
  return allUsers
}
