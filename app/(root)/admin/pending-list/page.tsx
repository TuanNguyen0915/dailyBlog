"use client"
import CheckAdmin from "@/components/shared/CheckAdmin"
import PostSkeleton from "@/components/shared/PostSkeleton"
import BlogsTable from "@/components/shared/blog/BlogsTable"
import { getPendingPosts } from "@/lib/actions/blog.action"
import { Blog } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const PendingPage = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>()
  const [transitioning, setTransition] = useTransition()
  const router = useRouter()
  const fetchNewBlogs = async () => {
    const blogs = await getPendingPosts()
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
      <div className="flexCenter h-[80vh] w-full flex-col gap-8">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    )
  }
  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <h1 className="text-center text-2xl font-extrabold">No Pending Blog</h1>
      </div>
    )
  }
  return (
    <CheckAdmin>
      <div className="mt-10 w-full space-y-4">
        <h1 className="text-3xl font-bold ">Pending Blogs ({blogs.length})</h1>
        <BlogsTable blogs={blogs} updatedBlogs={fetchNewBlogs} />
      </div>
    </CheckAdmin>
  )
}

export default PendingPage
