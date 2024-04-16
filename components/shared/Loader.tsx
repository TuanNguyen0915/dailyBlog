"use client"
import { PuffLoader } from "react-spinners"
const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <PuffLoader size={100} color="green" />
    </div>
  )
}

export default Loader
