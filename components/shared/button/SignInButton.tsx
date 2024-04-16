"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const SignInButton = () => {
  const router = useRouter()
  return <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
}

export default SignInButton
