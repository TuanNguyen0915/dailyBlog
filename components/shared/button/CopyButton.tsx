"use client"
import { CopyCheck, CopyIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const CopyButton = ({ id }: { id: string }) => {
  const [copying, setCopying] = useState(false)
  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent
    try {
      await navigator.clipboard.writeText(text!)
    } catch (error) {
      toast.error("Failed to copy")
    }
    setCopying(true)
    toast.success("Copied!")
    setTimeout(() => setCopying(false), 2000)
  }
  return (
    <div>
      {copying ? (
        <CopyCheck className="cursor-not-allowed text-primary"/>
      ) : (
        <CopyIcon className="cursor-pointer" onClick={handleCopy} />
      )}
    </div>
  )
}

export default CopyButton
