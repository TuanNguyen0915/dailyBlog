"use server"

import prisma from "@/prisma/prismaDb"
import bcrypt from "bcrypt"
import {revalidatePath} from "next/cache"

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

export const updateUserRole = async (userId: string, role: boolean) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isAdmin: role,
    },
  })
  revalidatePath("/admin/dashboard")
  return user
}

export const createSomeUsers = async () => {
  let userLists = [
    {
      email: "gadode@ofotu.gs",
      hashPassword: bcrypt.hashSync("Z296jzMoVKIFTUT", 10),
      username: "Bobby Porter",
    },
    {
      email: "pekajen@ivi.lb",
      hashPassword: bcrypt.hashSync("0TmT6SzWmO2kfhX1", 10),
      username: "Ida Goodwin",
    },
    {
      email: "buwu@cuojage.vn",
      hashPassword: bcrypt.hashSync("1kOTqjqOwdq2F6ErHE", 10),
      username: "Cordelia Logan",
    },
    {
      email: "jamew@inah.ag",
      hashPassword: bcrypt.hashSync("ASS8tsAkCAnPi", 10),
      username: "Lucile Campbell",
    },
    {
      email: "luc@ehi.gr",
      hashPassword: bcrypt.hashSync("aNpC1LD", 10),
      username: "Pauline Green",
    },
    {
      email: "kohimuv@jumogfo.vi",
      hashPassword: bcrypt.hashSync("ueZG6h8HHN", 10),
      username: "Eva Boyd",
    },
    {
      email: "eg@re.ba",
      hashPassword: bcrypt.hashSync("w5mOHLW9K4xXeIGg", 10),
      username: "Ricardo Alvarez",
    },
    {
      email: "hahci@viuluul.gq",
      hashPassword: bcrypt.hashSync("NDJJcU", 10),
      username: "Derrick Elliott",
    },
    {
      email: "malemben@nulviko.za",
      hashPassword: bcrypt.hashSync("bxJUPvmHSSpzhTMREX", 10),
      username: "Raymond West",
    },
    {
      email: "guhunuw@potu.nz",
      hashPassword: bcrypt.hashSync("FbThWEbZcbCk", 10),
      username: "Kyle Harrington",
    },
    {
      email: "calkir@ap.er",
      hashPassword: bcrypt.hashSync("G4EhQtln", 10),
      username: "Eleanor Gardner",
    },
  ]
  const users = await prisma.user.createMany({
    data: userLists,
  })
  return users
}
