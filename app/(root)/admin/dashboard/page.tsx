"use client"
import CheckAdmin from "@/components/shared/CheckAdmin"
import PostSkeleton from "@/components/shared/PostSkeleton"
import DashBoardCard from "@/components/shared/admin/DashBoardCard"
import DashBoardTable from "@/components/shared/admin/DashBoardTable"
import { getAllBlogs } from "@/lib/actions/blog.action"
import { getAllUser } from "@/lib/actions/user.action"
import { SafeUser } from "@/lib/types"
import { Blog } from "@prisma/client"
import { motion } from "framer-motion"
import { useEffect, useState, useTransition } from "react"
const AdminDashBoard = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [allUsers, setAllUsers] = useState<SafeUser[]>([])
  const [transitioning, setTransition] = useTransition()

  const fetchUsers = async () => {
    const users = await getAllUser()
    setAllUsers(users)
  }
  const fetchAllBlogs = async () => {
    const blogs = await getAllBlogs()
    setAllBlogs(blogs)
  }

  useEffect(() => {
    setTransition(async () => {
      Promise.all([fetchUsers(), fetchAllBlogs()])
    })
  }, [])
  return (
    <CheckAdmin>
      {transitioning ? (
        <div className="flexCenter h-[80vh] w-full flex-col gap-8">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 1 }}
          className="mt-10 w-full space-y-10 p-2 max-md:mt-8"
        >
          <div className="flex w-full items-center justify-evenly">
            <div className="flexCenter w-full">
              <DashBoardCard title="users" count={allUsers?.length} />
            </div>
            <div className="flexCenter w-full">
              <DashBoardCard title="posts" count={allBlogs?.length} />
            </div>
          </div>
          <div className="flexCenter w-full">
            <DashBoardTable data={allUsers} updated={fetchUsers}/>
          </div>
        </motion.div>
      )}
    </CheckAdmin>
  )
}

export default AdminDashBoard
