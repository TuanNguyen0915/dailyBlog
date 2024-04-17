import { Blog, User } from "@prisma/client"
import { create } from "zustand"

interface IUserStore {
  currentUser: User & {blogs: Blog[]} | null
  setCurrentUser: (currentUser: User & {blogs: Blog[]}) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: User & {blogs: Blog[]}) => set({ currentUser }),
}))
