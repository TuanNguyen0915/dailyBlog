"use client"
import MarkDown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/atom-one-dark.css"
import { Terminal } from "lucide-react"
import CopyButton from "./button/CopyButton"
import Image from "next/image"
import { useState } from "react"
const MarkdownPreview = ({
  content,
  isPreview,
}: {
  content: string
  isPreview?: boolean
}) => {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <MarkDown
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-bold" />
        },
        h2: ({ node, ...props }) => {
          return <h2 {...props} className="text-xl font-semibold" />
        },
        h3: ({ node, ...props }) => {
          return <h3 {...props} className="text-base" />
        },
        blockquote: ({ node, ...props }) => {
          return (
            <blockquote
              {...props}
              className="ml-4 w-full border-l-4 border-muted-foreground pl-4"
            />
          )
        },
        img: (props) => {
          return (
            <div className="flexCenter w-full">
              <Image
                src={props.src!}
                alt="image"
                width={400}
                height={400}
                className={`rounded-lg ${imageLoading ? "blur" : ""} transition-all duration-500`}
                onLoad={()=> setImageLoading(false)}
              />
            </div>
          )
        },
        code: ({ node, className, children, ...props }) => {
          const id = crypto.randomUUID()
          return (
            <div
              className={`${isPreview ? "w-full" : "w-1/2"} max-lg:text-md max-h-[40vh] w-full space-y-2 overflow-scroll bg-zinc-800/80 max-md:text-sm`}
            >
              <div className="flexBetween w-full">
                <Terminal />
                <CopyButton id={id} />
              </div>
              <div className="w-full overflow-x-auto" id={id}>
                {children}
              </div>
            </div>
          )
        },
      }}
      className={`w-full space-y-4`}
    >
      {content}
    </MarkDown>
  )
}

export default MarkdownPreview
