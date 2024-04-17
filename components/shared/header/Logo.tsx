import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="group flex gap-1 text-3xl font-extrabold tracking-wide lg:text-4xl"
    >
      <p className="transition-all group-hover:text-primary">Daily</p>
      <p className="text-primary transition-all group-hover:text-foreground">Blog</p>
    </Link>
  )
}

export default Logo
