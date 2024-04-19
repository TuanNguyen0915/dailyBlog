import PostSkeleton from "@/components/shared/PostSkeleton"
import BlogCard from "@/components/shared/blog/BlogCard"

import { getAllBlogs } from "@/lib/actions/blog.action"
import { Blog } from "@prisma/client"

const Home = async () => {
  const blogs = await getAllBlogs()
  if (blogs.length === 0) {
    return (
      <div className="mt-10 w-full text-center">
        <h1 className="text-2xl font-bold">Sorry, there are no posts</h1>
      </div>
    )
  }
  return (
    <div className="mt-8 grid w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {blogs.map((blog: Blog, idx) => (
        <div
          key={blog.id}
          className={`${idx === 0 && "col-span-2 xl:col-span-3"} w-full`}
        >
          <BlogCard blog={blog} idx={idx} />
        </div>
      ))}
    </div>
  )
}
export default Home
