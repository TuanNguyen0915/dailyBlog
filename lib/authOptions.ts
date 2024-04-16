import { Account, AuthOptions, User as AuthUser } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import prisma from "@/prisma/prismaDb"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          throw new Error("This account does not exist")
        }
        const isCorrectPassword = bcrypt.compareSync(
          credentials.password,
          user.hashPassword!,
        )
        if (!isCorrectPassword) {
          throw new Error("Password is incorrect")
        } else {
          return user
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser
      account: Account | null
    }) {
      if (account?.provider === "credentials") {
        return true
      }
      if (account?.provider === "github") {
        const githubUser = await prisma.user.findUnique({
          where: {
            email: user?.email!,
          },
        })
        if (!githubUser) {
          await prisma.user.create({
            data: {
              email: user?.email!,
              username: user.name,
              avatar: user.image,
            },
          })
          return true
        }
        return true
      }

      if (account?.provider === "google") {
        const googleUser = await prisma.user.findUnique({
          where: {
            email: user?.email!,
          },
        })
        if (!googleUser) {
          await prisma.user.create({
            data: {
              email: user?.email!,
              username: user.name,
              avatar: user.image,
            },
          })
          return true
        }
        return true
      }
      return true
    },
  },
}
