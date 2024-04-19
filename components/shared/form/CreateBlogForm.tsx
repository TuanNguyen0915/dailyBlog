"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { EyeIcon, Pencil } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MarkdownPreview from "../MarkdownPreview"
import toast from "react-hot-toast"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"
import { createNewBlog, updateBlog } from "@/lib/actions/blog.action"
import { Blog } from "@prisma/client"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  imageCover: z.string().url("Invalid image url"),
  published: z.boolean(),
  authorId: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>

const CreateBlogForm = ({ blog, action }: { blog?: Blog; action?: string }) => {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useUserStore()
  const [isPreview, setPreview] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      imageCover: blog?.imageCover || "",
      published: blog?.published || true,
      authorId: blog?.authorId || "",
    },
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (action === "edit") {
      const updatedBlog = await updateBlog(blog?.id!, data)
      if (!updatedBlog) {
        toast.error("Something went wrong")
      } else {
        toast.success("Blog updated successfully")
        // router.push(`/blog/${blog?.id}`)
        router.push("/dashboard")
      }
    } else {
      if (!data.imageCover.includes("images.unsplash.com")) {
        return toast.error("Invalid image url")
      } else {
        data.authorId = currentUser?.id!
        const updatedUser = await createNewBlog(data)
        if (!updatedUser) {
          toast.error("Something went wrong")
        } else {
          toast.success("Blog created successfully")
          setCurrentUser(updatedUser)
          router.push("/dashboard")
        }
      }
    }
  }
  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flexCenter gap-4">
        <div
          onClick={() => setPreview(!isPreview)}
          className="min-w-[100px] cursor-pointer rounded-md border border-secondary bg-secondary px-2 py-1 transition-all hover:border-primary hover:bg-transparent"
        >
          {isPreview ? (
            <div className="flexCenter gap-1">
              <Pencil size={20} /> Edit
            </div>
          ) : (
            <div className="flexCenter gap-1">
              <EyeIcon size={20} /> Preview
            </div>
          )}
        </div>
        <div className="min-w-[100px] rounded-md border border-secondary bg-secondary px-2 py-1 transition-all hover:border-primary hover:bg-transparent">
          <div className="flexCenter gap-1">
            <p>Publish</p>
            <Switch
              {...register("published")}
              checked={watch("published")}
              onCheckedChange={() => setValue("published", !watch("published"))}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-4">
        <div className={`${isPreview && "hidden"} w-full space-y-4`}>
          <input
            {...register("title")}
            className="w-full rounded-md px-4 py-2 focus:outline-primary"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
          <input
            {...register("imageCover")}
            className="w-full rounded-md px-4 py-2 focus:outline-primary"
            placeholder="Just accepted a picture from unsplash.com"
          />
          {errors.imageCover && (
            <p className="text-sm text-red-500">{errors.imageCover.message}</p>
          )}
          <textarea
            {...register("content")}
            className="w-full rounded-md px-4 py-2 focus:outline-primary"
            placeholder="Content"
            rows={20}
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
          <Button
            disabled={isSubmitting}
            className="disabled:op-50 disabled:cursor-not-allowed"
          >
            {action === "edit" ? "Update" : "Create"}
          </Button>
        </div>

        <div className={`${!isPreview && "max-xl:hidden"} w-full space-y-4`}>
          <h1 className="text-2xl font-semibold text-primary">
            {watch("title")}
          </h1>
          {watch("imageCover") ? (
            watch("imageCover").includes("https://images.unsplash.com") ? (
              <Image
                src={watch("imageCover")}
                width={700}
                height={700}
                alt="image"
                className="rounded-lg object-contain"
              />
            ) : (
              <div className="rounded-lg bg-green-600/40 p-4">
                Sorry, we just accept a picture from unsplash.com for now
              </div>
            )
          ) : (
            <></>
          )}
          <MarkdownPreview content={watch("content")} isPreview={isPreview} />
        </div>
      </div>
    </form>
  )
}

export default CreateBlogForm
