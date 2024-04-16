"use client"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle"
import SignInButton from "../button/SignInButton"

import SignOutButton from "../button/SignOutButton"
import { useUserStore } from "@/lib/stores/user.store"
import UserButton from "../button/UserButton"

const Navbar = () => {
  const { currentUser } = useUserStore()
  return (
    <header className="flexBetween rounded-lg border-b-2 border-primary px-2 py-4 shadow-lg">
      <Link href={"/"} className="text-3xl font-extrabold">
        Daily Blog
      </Link>
      <div className="flexBetween gap-4">
        <ThemeToggle />
        {currentUser ? <div className="flexCenter gap-4">
          <UserButton />
          <SignOutButton />
        </div> : <SignInButton />}
      </div>
    </header>
  )
}

export default Navbar
