"use client"

import { getCurrentUser } from "@/lib/services/user.service"
import { useUserStore } from "@/lib/stores/user.store"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const CurrentUser = () => {
  const { data: session } = useSession()
  const { setCurrentUser } = useUserStore()
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser(session?.user?.email!)
      setCurrentUser(user!)
    }
    if (session?.user?.email) {
      fetchCurrentUser()
    }
  }, [session?.user?.email, setCurrentUser])
 
  return <></>
}

export default CurrentUser
