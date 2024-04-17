import CheckAdmin from "@/components/shared/CheckAdmin"
import CreateBlogForm from "@/components/shared/form/CreateBlogForm"
import React from "react"

const CreatePost = () => {
  return (
    // <CheckAdmin>
    //   <div className="mt-8 w-full space-y-4 p-2">
    //     <h1 className="text-3xl font-bold">Create New Post</h1>
    //     <div className="flexCenter w-full rounded-lg border border-border bg-indigo-950/30 p-2 lg:p-4">
    //       <CreateBlogForm />
    //     </div>
    //   </div>
    // </CheckAdmin>
    <div className="mt-8 w-full space-y-4 p-2">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <div className="flexCenter w-full rounded-lg border border-border bg-indigo-950/30 p-2 lg:p-4">
        <CreateBlogForm />
      </div>
    </div>
  )
}

export default CreatePost
