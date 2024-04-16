import React from "react"

const VerticalDivider = () => {
  return (
    <div className="flexCol h-[200px] w-1 items-center py-6 max-lg:hidden">
      <div className="h-full w-full bg-primary" />
      <p className="text-lg font-bold text-muted-foreground">OR</p>
      <div className="h-full w-full bg-primary" />
    </div>
  )
}

export default VerticalDivider
