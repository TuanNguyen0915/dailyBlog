"use client"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"

import BlogTableRow from "./BlogTableRow"
import { useEffect, useState, useTransition } from "react"
import { Blog } from "@prisma/client"
import Loader from "../Loader"
import { getBlogsByAuthor } from "@/lib/actions/blog.action"

const BlogsTable = ({ authorId }: { authorId: string }) => {
  const [blogs, setBlogs] = useState<Blog[] | null>()
  const [transitioning, setTransition] = useTransition()
  const fetchNewBlogs = async () => {
    const blogs = await getBlogsByAuthor(authorId)
    setBlogs(blogs)
  }
  useEffect(()=> {
    setTransition(async()=> {
      fetchNewBlogs()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!blogs) {
    return (
      <div>
        <h1 className="text-center text-2xl font-extrabold">No blogs</h1>
      </div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.75 }}
      className="w-full"
    >
      <Table className="rounded-lg border border-border bg-secondary p-4">
        <TableHeader>
          <TableRow>
            <TableHead>TITLE</TableHead>
            <TableHead className="max-md:hidden"></TableHead>
            <TableHead className="text-end">PUBLISH</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <BlogTableRow key={blog.id} blog={blog} updatedBlogs={fetchNewBlogs}/>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default BlogsTable
