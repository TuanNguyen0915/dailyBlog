/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInSchemaType = z.infer<typeof formSchema>
const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (res?.error) {
      toast.error(res.error, {
        style: {
          color: "white",
          background: "red",
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCol w-full gap-4">
      <div className="group flex w-full items-center gap-4 rounded-full border border-muted-foreground px-4 py-2 md:py-1">
        <Mail
          size={40}
          className="opacity-60 transition-all group-hover:opacity-100"
        />
        <input
          autoComplete="off"
          className="max-lg:text-md w-full rounded-xl bg-transparent px-2 py-1 opacity-80 focus:outline-none group-hover:opacity-100"
          placeholder="Email"
          {...register("email")}
        />
      </div>
      {errors.email && (
        <p className="text-md italic text-red-500">{errors.email.message}</p>
      )}
      <div className="group flex w-full items-center gap-4 rounded-full border border-muted-foreground px-4 py-2 md:py-1">
        <Lock
          size={40}
          className="opacity-60 transition-all group-hover:opacity-100"
        />
        <input
          type={showPassword ? "text" : "password"}
          className="max-lg:text-md w-full rounded-xl bg-transparent px-2 py-1 opacity-80 focus:outline-none group-hover:opacity-100"
          placeholder="password"
          {...register("password")}
        />
        {showPassword ? (
          <RiEye2Fill
            size={24}
            className="cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        ) : (
          <RiEyeCloseFill
            size={24}
            className="cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        )}
      </div>
      {errors.password && (
        <p className="text-md italic text-red-500">{errors.password.message}</p>
      )}
      <div className="flexBetween w-full flex-row-reverse gap-6">
        <Button className="w-full rounded-full text-xl font-bold">
          Sign In
        </Button>
        <Link
          href={"/auth/signup"}
          className="group flex w-full flex-col gap-2 md:items-center"
        >
          <p className="w-full text-muted-foreground transition-all group-hover:text-foreground">
            Don't have an account?
          </p>
          <p className="w-full transition-all group-hover:text-primary group-hover:brightness-125">
            Create new one
          </p>
        </Link>
      </div>
    </form>
  )
}

export default SignInForm
