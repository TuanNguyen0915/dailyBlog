import MarkDown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/atom-one-dark.css"
import { CopyIcon, Terminal } from "lucide-react"
import CopyButton from "./button/CopyButton"
const MarkdownPreview = ({ content }: { content: string }) => {
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
        code: ({ node, className, children, ...props }) => {
          const id = crypto.randomUUID()
          return (
            <div className="w-full space-y-2 rounded-lg border border-border bg-indigo-800/20 p-2">
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
    >
      {content}
    </MarkDown>
  )
}

export default MarkdownPreview
