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

