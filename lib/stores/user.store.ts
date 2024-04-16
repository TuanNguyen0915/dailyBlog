import { User } from "@prisma/client"
import { create } from "zustand"

interface IUserStore {
  currentUser: User | null
  setCurrentUser: (currentUser: User) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: User) => set({ currentUser }),
}))
