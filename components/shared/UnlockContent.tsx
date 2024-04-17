import React from "react"
import SignInButton from "./button/SignInButton"

const UnlockContent = () => {
  return (
    <div className="flexCenter sticky bottom-0 z-50 h-[400px] backdrop-blur-lg  w-full flex-col gap-4 bg-gradient-to-b from-zinc-800/80 to-zinc-800">
      <h1 className="text-center text-2xl text-primary">
        Please sign in to unlock the content
      </h1>
      <SignInButton />
    </div>
  )
}

export default UnlockContent
