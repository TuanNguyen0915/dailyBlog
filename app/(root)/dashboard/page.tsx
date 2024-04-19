"use client"
import CheckAdmin from "@/components/shared/CheckAdmin"
import PostSkeleton from "@/components/shared/PostSkeleton"
import BlogsTable from "@/components/shared/blog/BlogsTable"
import { Button } from "@/components/ui/button"
import { getBlogsByAuthor } from "@/lib/actions/blog.action"
import { useUserStore } from "@/lib/stores/user.store"
import { Blog } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { RiAddFill } from "react-icons/ri"

const DashBoardPage = () => {
  const { currentUser } = useUserStore()
  const [blogs, setBlogs] = useState<Blog[] | null>()
  const [transitioning, setTransition] = useTransition()
  const router = useRouter()
  const fetchNewBlogs = async () => {
    const blogs = await getBlogsByAuthor(currentUser?.id!)
    setBlogs(blogs)
  }
  useEffect(() => {
    setTransition(async () => {
      fetchNewBlogs()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (transitioning) {
    return (
      <div className="flexCenter w-full">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    )
  }
  if (!blogs) {
    return (
      <div>
        <h1 className="text-center text-2xl font-extrabold">No blogs</h1>
      </div>
    )
  }
  return (
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
        <BlogsTable blogs={blogs} updatedBlogs={fetchNewBlogs} />
      </div>
    </CheckAdmin>
  )
}
export default DashBoardPage
