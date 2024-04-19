
import { create } from "zustand"
import { SafeUser } from "../types"

interface IUserStore {
  currentUser: SafeUser | null
  setCurrentUser: (currentUser: SafeUser) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: SafeUser) => set({ currentUser }),
}))
