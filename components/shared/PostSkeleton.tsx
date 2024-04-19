import React from "react"

const PostSkeleton = () => {
  return (
    <div className="flexCenter w-full">
      <div className="w-full space-y-4 lg:w-1/2">
        <div className="h-[200px] w-full animate-pulse rounded-xl bg-muted lg:h-[300px]" />
        <div className="h-[25px] w-3/4 animate-pulse rounded-xl  bg-muted" />
        <div className="h-[25px] w-3/4 animate-pulse rounded-xl  bg-muted" />
      </div>
    </div>
  )
}

export default PostSkeleton
