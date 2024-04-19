"use client"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useUserStore()
  const router = useRouter()
  if (!currentUser?.isAdmin) {
    router.push("/")
    return <></>
  } else {
    return <div>{children}</div>
  }
}

export default CheckAdmin
