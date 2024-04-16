"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "../ui/switch"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={`border-border flexBetween relative gap-4 rounded-2xl border px-4 py-2`}
    >
      <div
        className={`${theme === "dark" ? "right-0" : "left-0"} absolute top-0 h-full w-1/2 rounded-2xl bg-primary transition-all duration-500`}
      ></div>
      <Moon size={15}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-primary cursor-pointer"
      />
      <Sun size={15}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-foreground cursor-pointer"
      />
    </div>
  )
}
