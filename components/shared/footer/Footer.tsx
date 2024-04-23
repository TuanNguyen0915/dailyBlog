"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import {
  RiFacebookBoxFill,
  RiGithubFill,
  RiLinkedinBoxFill,
} from "react-icons/ri"

const Footer = () => {
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-full space-y-4 mt-20">
      <p
        onClick={handleToTop}
        className="animate-bounce cursor-pointer text-center text-lg font-bold capitalize text-foreground transition-all hover:text-primary"
      >
        Back to top
      </p>
      <div className="flexCenter max-md:flex-col w-full gap-10">
        <div className="flexCenter max-h-6 w-full">
          <input
            type="email"
            placeholder="Email me ..."
            className="h-full w-3/4 rounded-l-lg bg-zinc-800/40 text-foreground p-2 focus:outline-none"
          />
          <Button className="h-full rounded-l-none">Send</Button>
        </div>
        <div className="flexCol w-full gap-4 border-l-2 border-muted-foreground p-2 px-4">
          <p className="text-xl font-bold uppercase">Connect</p>
          <div className="flex w-full items-center gap-10">
            <RiFacebookBoxFill className="size-10 cursor-pointer text-primary transition-all hover:text-foreground hover:brightness-125 max-md:size-6" />
            <RiGithubFill className="size-10 cursor-pointer text-primary transition-all hover:text-foreground hover:brightness-125 max-md:size-6" />
            <RiLinkedinBoxFill className="size-10 cursor-pointer text-primary transition-all hover:text-foreground hover:brightness-125 max-md:size-6" />
          </div>
        </div>
      </div>
      <p className="text-center text-muted-foreground">Tuan Nguyen</p>
      <p className="text-center text-muted-foreground">
        © 2024. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
