"use client"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"
import { RiAddFill } from "react-icons/ri"

const DashBoardPage = () => {
  const router = useRouter()
  const { currentUser } = useUserStore()
  if (!currentUser) {
    return router.push("/")
  } else {
    return (
      <div className="mt-8 w-full space-y-4">
        <div className="flexBetween w-full px-2">
          <h1 className="text-3xl font-bold">
            Welcome, {currentUser.username}
          </h1>
          <Button
            variant={"outline"}
            className="flexCenter gap-2 hover:border-primary"
            onClick={() => router.push("/dashboard/create")}
          >
            <RiAddFill size={20} />
            Create
          </Button>
        </div>
      </div>
    )
  }
}

export default DashBoardPage
