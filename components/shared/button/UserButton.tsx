"use client"
import { useUserStore } from "@/lib/stores/user.store"
import { LogOutIcon, User2, WalletIcon } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { userMenu } from "@/lib/constants"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
const UserButton = () => {
  const pathName = usePathname()
  const router = useRouter()
  const { currentUser } = useUserStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-64 space-y-4">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p>{currentUser?.username}</p>
            <p className="text-sm italic text-muted-foreground">
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenu.map((item: any) => {
          const Icon = item.icon
          const active = pathName === item.href
          return (
            <div key={item.name} className="group w-full space-y-1">
              <DropdownMenuItem
                onClick={() => router.push(item.href)}
                className={`${active ? "pl-8 text-primary" : ""} text-md flexBetween w-full font-semibold`}
              >
                <Icon />
                <p>{item.name}</p>
              </DropdownMenuItem>
              <div
                className={`${!active && "group-hover:w-full"} h-[1px] w-0 bg-primary transition-all duration-500`}
              />
            </div>
          )
        })}
        {currentUser?.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <div className="group w-full space-y-1">
              <DropdownMenuItem
                className="text-md flexBetween w-full font-semibold group-hover:text-primary"
                onClick={() => {
                  router.push("/admin/pending-list")
                }}
              >
                <WalletIcon />
                <p>Pending List</p>
              </DropdownMenuItem>
              <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </>
        )}
        <DropdownMenuSeparator />
        <div className="group w-full space-y-1">
          <DropdownMenuItem
            className="text-md flexBetween w-full font-semibold group-hover:text-primary"
            onClick={() => signOut()}
          >
            <LogOutIcon />
            <p>Sign out</p>
          </DropdownMenuItem>
          <div className="h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
