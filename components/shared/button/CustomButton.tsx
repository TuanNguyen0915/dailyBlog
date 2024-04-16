"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import { RiGithubFill, RiGoogleFill } from "react-icons/ri"
interface IProps {
  title: string
  handleClick?: () => void
  type?: string
}

const CustomButton = ({ title, handleClick, type }: IProps) => {
  

  return (
    <Button
      className={`${type === "google" ? "border-red-700 bg-red-700" : "border-[#333] bg-[#333]"} flexBetween w-full gap-4 rounded-full border text-lg text-white hover:bg-transparent hover:text-foreground`}
      onClick={handleClick}
    >
      {title}
      {type === "google" ? (
        <RiGoogleFill size={26} />
      ) : (
        <RiGithubFill size={26} />
      )}
    </Button>
  )
}

export default CustomButton
