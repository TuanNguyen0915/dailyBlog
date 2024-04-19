"use client"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { EyeIcon, Pen, Trash2 } from "lucide-react"
import { Blog } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/stores/user.store"
import { deleteBlog } from "@/lib/actions/blog.action"
import toast from "react-hot-toast"

interface IProps {
  blog: Blog
  updatedBlogs: () => void
}

const BlogTableRow = ({ blog, updatedBlogs }:IProps) => {
  const { setCurrentUser } = useUserStore()
  const router = useRouter()

  const handleDelete = async () => {
    const user = await deleteBlog(blog.id)
    if (!user) {
      toast.error("Failed to delete blog")
    } else {
      toast.success("Blog deleted successfully")
      setCurrentUser(user)
      updatedBlogs()
    }
  }
  return (
    <TableRow key={blog.id}>
      <TableCell className="space-y-4">
        <p className="text-2xl capitalize max-lg:text-xl">{blog.title}</p>
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
            onClick={handleDelete}
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
  )
}

export default BlogTableRow
