import CheckAdmin from "@/components/shared/CheckAdmin"
import CreateBlogForm from "@/components/shared/form/CreateBlogForm"
import { getBlogById } from "@/lib/actions/blog.action"
import React from "react"

const EditBlogPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlogById(params.blogId)

  return (
    <CheckAdmin>
      <div className="mt-8 w-full space-y-4 p-2">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <div className="flexCenter w-full rounded-lg border border-border bg-indigo-950/30 p-2 lg:p-4">
          <CreateBlogForm blog={blog!} action="edit" />
        </div>
      </div>
    </CheckAdmin>
  )
}

export default EditBlogPage
