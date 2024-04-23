"use client"
import { Switch } from "@/components/ui/switch"
import { updateUserRole } from "@/lib/actions/user.action"
import { User } from "@prisma/client"

import React from "react"

interface IProps {
  data: User[]
  updated: () => void
}
const DataInfo = ({ data, updated }: IProps) => {
  return (
    <div>
      {data.map((user) => {
        const updateAdminRole = async () => {
          await updateUserRole(user.id, !user.isAdmin)
          if (updated) {
            updated()
          }
        }
        return (
          <div key={user.id} className="flexBetween my-4 w-full gap-10">
            <h1 className="w-full text-start max-lg:hidden">{user.username}</h1>
            <h1 className="w-full text-start">{user.email}</h1>
            <Switch checked={user.isAdmin} onCheckedChange={updateAdminRole} />
          </div>
        )
      })}
    </div>
  )
}

export default DataInfo
