"use client"

import { Blog } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

import React, { useState } from "react"

const BlogCard = ({ blog }: { blog: Blog }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const router = useRouter()
  const lastUpdated = new Date(blog.updatedAt).toDateString()
  return (
    <div
      className="group w-full cursor-pointer space-y-4 rounded-lg border border-border p-2 transition-all hover:border-primary/40"
      onClick={() => {
        router.push(`/blog/${blog.id}`)
      }}
    >
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={blog.imageCover!}
          alt={blog.title}
          fill
          className={`${imageLoading ? "blur" : ""} rounded-lg transition-all duration-500 group-hover:scale-110`}
          onLoad={() => setImageLoading(false)}
        />
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-sm italic text-muted-foreground">
          Latest update: {lastUpdated}
        </p>
        <p className="text-2xl font-semibold capitalize">{blog.title}</p>
      </div>
    </div>
  )
}

export default BlogCard
