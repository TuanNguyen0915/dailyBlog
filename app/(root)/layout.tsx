import CurrentUser from "@/components/shared/CurrentUser"
import Footer from "@/components/shared/footer/Footer"
import Navbar from "@/components/shared/header/Navbar"

export default function RootLayOut({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flexCol min-h-screen justify-between">
      <CurrentUser />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
