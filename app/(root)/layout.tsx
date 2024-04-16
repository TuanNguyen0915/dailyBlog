import Footer from "@/components/shared/footer/Footer"
import Navbar from "@/components/shared/header/Navbar"

export default function RootLayOut({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flexCol min-h-screen justify-between">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
