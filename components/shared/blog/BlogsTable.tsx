"use client"
import { Blog } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { EyeIcon, Pen, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
const BlogsTable = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
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
            <TableRow key={blog.id}>
              <TableCell className="space-y-4">
                <p className="text-2xl capitalize max-lg:text-xl">
                  {blog.title}
                </p>
                <div className="flex gap-2">
                  <div
                    className="flexCenter min-w-[80px] cursor-pointer gap-1 rounded-lg bg-green-600 px-2 py-1 opacity-80 transition-all hover:opacity-100"
                    onClick={() => {
                      router.push(`/blog/${blog.id}`)
                    }}
                  >
                    <EyeIcon className="max-md:hidden" />
                    View
                  </div>
                  <div
                    className="flexCenter min-w-[80px] cursor-pointer gap-1 rounded-lg bg-orange-400 px-2 py-1 opacity-80 transition-all hover:opacity-100"
                    onClick={() => {
                      router.push(`/dashboard/edit/${blog.id}`)
                    }}
                  >
                    <Pen className="max-md:hidden" />
                    Edit
                  </div>
                  <div
                    className="flexCenter min-w-[80px] cursor-pointer gap-1 rounded-lg bg-red-400 px-2 py-1 opacity-80 transition-all hover:opacity-100"
                    onClick={() => {}}
                  >
                    <Trash2 className="max-md:hidden" />
                    Delete
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-md:hidden">
                <Image
                  src={blog.imageCover!}
                  alt={blog.title}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell className="text-end">
                <Switch checked={blog.published} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default BlogsTable
