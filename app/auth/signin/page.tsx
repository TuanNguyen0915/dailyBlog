"use client"
import CustomButton from "@/components/shared/button/CustomButton"
import HorizontalDivider from "@/components/shared/divider/HorizontalDivider"
import VerticalDivider from "@/components/shared/divider/VerticalDivider"
import SignInForm from "@/components/shared/form/SignInForm"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const SignInPage = () => {
  const { status } = useSession()
  if (status === "authenticated") {
    return redirect("/")
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.75 }}
      className="flexCol w-full gap-4 2xl:w-2/3"
    >
      <h1 className="auth-h1 mb-6">Sign In</h1>
      <div className="flexCenter w-full gap-10 max-lg:flex-col lg:px-6">
        <div className="flexCenter w-full flex-col gap-4 px-2 md:w-3/4 lg:w-1/2">
          <CustomButton
            title="Continue with Google"
            type="google"
            handleClick={() => signIn("google", { callbackUrl: "/" })}
          />
          <CustomButton
            title="Continue with Github"
            handleClick={() => signIn("github", { callbackUrl: "/" })}
          />
        </div>
        <VerticalDivider />
        <HorizontalDivider />
        <div className="flexCenter w-full px-2 md:w-3/4 lg:w-1/2">
          <SignInForm />
        </div>
      </div>
    </motion.div>
  )
}

export default SignInPage
