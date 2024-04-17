import BlogDetails from "@/components/shared/blog/BlogDetails"
import { getBlogById } from "@/lib/actions/blog.action"

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlogById(params.blogId)
  if (!blog) {
    return <div>Blog not found</div>
  } else {
    return <div>
      <BlogDetails blog={blog}/>
    </div>
  }
}

export default BlogPage
