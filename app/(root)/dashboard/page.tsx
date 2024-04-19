"use client"
import CheckAdmin from "@/components/shared/CheckAdmin"
import CurrentUser from "@/components/shared/CurrentUser"
import BlogsTable from "@/components/shared/blog/BlogsTable"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"
import { RiAddFill } from "react-icons/ri"

const DashBoardPage = () => {
  const { currentUser } = useUserStore()
  const router = useRouter()
  return (
    <>
      <CurrentUser />

      <CheckAdmin>
        <div className="mt-8 w-full space-y-4">
          <div className="flexBetween w-full px-2">
            <h1 className="text-3xl font-bold">
              Welcome, {currentUser?.username}
            </h1>

            {currentUser?.isAdmin && (
              <Button
                variant={"outline"}
                className="flexCenter gap-2 hover:border-primary"
                onClick={() => router.push("/dashboard/create")}
              >
                <RiAddFill size={20} />
                Create
              </Button>
            )}
          </div>
          <BlogsTable authorId={currentUser?.id!} />
        </div>
      </CheckAdmin>
    </>
  )
}
export default DashBoardPage
