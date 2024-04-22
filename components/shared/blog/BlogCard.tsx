"use client"

import { Blog } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

import React, { useState } from "react"

const BlogCard = ({ blog, idx }: { blog: Blog; idx: number }) => {
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
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg lg:h-[400px]">
        <Image
          src={blog.imageCover!}
          alt={blog.title}
          fill
          className={`${imageLoading ? "blur" : ""} ${idx === 0 && "object-center"} rounded-lg transition-all duration-500 group-hover:scale-110`}
          onLoad={() => setImageLoading(false)}
        />
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-sm italic text-muted-foreground">
          <span className="max-md:hidden">Latest update:</span> {lastUpdated}
        </p>
        <p className="text-2xl max-lg:text-base font-semibold capitalize">{blog.title}</p>
      </div>
    </div>
  )
}

export default BlogCard
