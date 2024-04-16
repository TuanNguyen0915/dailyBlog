import Link from "next/link"
import ThemeToggle from "../ThemeToggle"
import SignInButton from "../button/SignInButton"

const Navbar = () => {
  return (
    <header className="flexBetween rounded-lg border-b-2 border-primary py-4 shadow-lg max-xl:px-2">
      <Link href={"/"} className="text-3xl font-extrabold">
        Daily Blog
      </Link>
      <div className="flexBetween gap-4">
        <ThemeToggle />
        <SignInButton />
      </div>
    </header>
  )
}

export default Navbar
