import React from "react"
import ThemeToggle from "../ThemeToggle"

const Navbar = () => {
  return (
    <div className="flexBetween rounded-lg border-b-2 border-primary py-4 shadow-lg max-xl:px-2">
      <h1 className="text-3xl font-extrabold">Daily Blog</h1>
      <ThemeToggle />
    </div>
  )
}

export default Navbar
