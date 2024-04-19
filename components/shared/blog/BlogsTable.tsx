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
import { Blog } from "@prisma/client"


interface IProps {
  blogs: Blog[]
  updatedBlogs: () => void
}

const BlogsTable = ({blogs, updatedBlogs}: IProps) => {
  
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
            <BlogTableRow
              key={blog.id}
              blog={blog}
              updatedBlogs={updatedBlogs}
            />
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default BlogsTable
