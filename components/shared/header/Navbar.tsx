"use client"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle"
import SignInButton from "../button/SignInButton"

import { useUserStore } from "@/lib/stores/user.store"
import UserButton from "../button/UserButton"
import Logo from "./Logo"

const Navbar = () => {
  const { currentUser } = useUserStore()
  return (
    <header className="flexBetween rounded-lg border-b-2 border-primary px-2 py-4 shadow-lg">
      <Logo />
      <div className="flexBetween gap-4">
        <ThemeToggle />
        {currentUser ? (
          <UserButton currentUser={currentUser} />
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  )
}

export default Navbar
