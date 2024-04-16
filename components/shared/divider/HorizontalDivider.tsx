import React from "react"

const HorizontalDivider = () => {
  return (
    <div className="flexCenter my-4 h-1 w-1/2 items-center gap-4 px-2 lg:hidden">
      <div className="h-full w-full bg-primary" />
      <p className="text-lg font-bold text-muted-foreground">OR</p>
      <div className="h-full w-full bg-primary" />
    </div>
  )
}

export default HorizontalDivider
