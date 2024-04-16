"use client"

import { useTheme } from "next-themes"
import { RiMoonClearFill, RiSunFill } from "react-icons/ri"
import { Button } from "../ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <RiSunFill size={24} />
      ) : (
        <RiMoonClearFill size={24} />
      )}
    </Button>
  )
}
