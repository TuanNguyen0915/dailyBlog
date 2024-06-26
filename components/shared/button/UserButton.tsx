"use client"

import { LayoutDashboard, LogOutIcon, User2, WalletIcon } from "lucide-react"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { RiAdminFill, RiDashboard2Fill } from "react-icons/ri"
import { SafeUser } from "@/lib/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface IProps {
  currentUser: SafeUser
}

const UserButton = ({ currentUser }: IProps) => {
  const router = useRouter()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flexCenter relative h-12 w-12 rounded-full border border-muted-foreground">
          {currentUser?.avatar ? (
            <Image
              fill
              src={currentUser?.avatar}
              alt="Avatar"
              className="cursor-pointer rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <User2 size={40} className="cursor-pointer" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flexCol min-w-64 gap-4 space-y-4">
        <div className="space-y-1">
          <p>{currentUser?.username}</p>
          <p className="text-sm italic text-muted-foreground">
            {currentUser?.email}
          </p>
        </div>

        <div className="group w-full space-y-1">
          <div
            className="text-md flexBetween w-full font-semibold group-hover:text-primary"
            onClick={() => {
              router.push("/dashboard")
            }}
          >
            <LayoutDashboard />
            <p>Dashboard</p>
          </div>
          <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>

        {currentUser?.isAdmin && (
          <>
            <h1 className="text-lg text-primary/80">Admin section</h1>

            <div className="group w-full space-y-1">
              <div
                className="text-md flexBetween w-full font-semibold group-hover:text-primary"
                onClick={() => {
                  router.push("/admin/pending-list")
                }}
              >
                <WalletIcon />
                <p>Pending List</p>
              </div>

              <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
            <div className="group w-full space-y-1">
              <div
                className="text-md flexBetween w-full font-semibold group-hover:text-primary"
                onClick={() => {
                  router.push("/admin/dashboard")
                }}
              >
                <RiAdminFill />
                <p>Dashboard</p>
              </div>
              <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </>
        )}

        <div className="group w-full space-y-1">
          <div
            className="text-md flexBetween w-full cursor-pointer font-semibold group-hover:text-primary"
            onClick={() => signOut()}
          >
            <LogOutIcon />
            <p>Sign out</p>
          </div>
          <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserButton
