"use client"
import { Blog, User } from "@prisma/client"
import Image from "next/image"
import MarkdownPreview from "../MarkdownPreview"
import { useUserStore } from "@/lib/stores/user.store"
import UnlockContent from "../UnlockContent"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface IProps {
  blog: Blog & { author: User }
}
const BlogDetails = ({ blog }: IProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const { currentUser } = useUserStore()
  const router = useRouter()
  const updated = new Date(blog.updatedAt).toDateString()
  return (
    <div className="mt-10 w-full space-y-4 p-2">
      <p className="text-end text-sm italic text-muted-foreground">
        Last updated: {updated}
      </p>
      <h1 className="text-4xl font-extrabold capitalize tracking-wider">
        {blog.title}
      </h1>

      <div className="flexBetween gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={blog.author.avatar!}
            width={60}
            height={60}
            alt={blog.author.username!}
            className="rounded-full max-lg:h-[50px] max-lg:w-[50px]"
          />
          <div className="flexCol space-y-2">
            <p className="text-lg font-bold max-lg:text-base">
              {blog.author.username}
            </p>
            <p className="text-sm italic text-muted-foreground">
              {blog.author.email}
            </p>
          </div>
        </div>
        {currentUser?.isAdmin && (
          <p className="text-sm italic text-muted-foreground">
            <Button
              variant="link"
              onClick={() => {
                router.push(`/dashboard/edit/${blog.id}`)
              }}
              className="text-lg"
            >
              Edit blog
            </Button>
          </p>
        )}
      </div>
      <div className="flexCenter w-full">
        <div className="relative h-[700px] w-1/2 p-2 max-md:h-[500px] max-md:w-full">
          <Image
            src={blog.imageCover!}
            fill
            alt={blog.title}
            className={`rounded-lg object-cover transition-all duration-500 ${imageLoading ? "blur" : ""}`}
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
      <div className="w-full">
        <MarkdownPreview
          content={currentUser ? blog.content : blog.content.slice(0, 200)}
        />
      </div>

      {!currentUser && <UnlockContent />}
    </div>
  )
}

export default BlogDetails
