"use client"
import Loader from "@/components/shared/Loader"
import { useUserStore } from "@/lib/stores/user.store"

const DashBoardPage = () => {
  const { currentUser } = useUserStore()
  if (!currentUser) {
    return (
      <div className="flexCenter h-[80vh] w-full">
        <Loader />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Welcome {currentUser.username}</h1>
      </div>
    )
  }
}

export default DashBoardPage
