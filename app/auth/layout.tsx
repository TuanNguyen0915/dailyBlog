import Footer from "@/components/shared/footer/Footer"
import Navbar from "@/components/shared/header/Navbar"
import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flexCol min-h-screen w-full justify-between">
      <Navbar />
      <div className="flexCenter flex-1">{children}</div>
      <Footer />
    </main>
  )
}

export default AuthLayout
