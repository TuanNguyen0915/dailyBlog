/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"

type IInput = {
  email: string
  password: string
}
const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IInput>()
  const onSubmit: SubmitHandler<IInput> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCol w-full gap-4">
      <div className="group flex w-full items-center gap-4 rounded-full border border-muted-foreground px-4 py-2 md:py-1">
        <Mail
          size={40}
          className="opacity-60 transition-all group-hover:opacity-100"
        />
        <input
          className="max-lg:text-md w-full rounded-xl bg-transparent px-2 py-1 opacity-80 focus:outline-none group-hover:opacity-100"
          type="email"
          placeholder="Email"
          {...(register("email"), { required: true })}
        />
      </div>
      <div className="group flex w-full items-center gap-4 rounded-full border border-muted-foreground px-4 py-2 md:py-1">
        <Lock
          size={40}
          className="opacity-60 transition-all group-hover:opacity-100"
        />
        <input
          className="max-lg:text-md w-full rounded-xl bg-transparent px-2 py-1 opacity-80 focus:outline-none group-hover:opacity-100"
          type="password"
          placeholder="password"
          {...(register("password"), { required: true })}
        />
      </div>

      <div className="flexBetween w-full gap-6">
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
        <Button className="w-full rounded-full text-xl font-bold">
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
