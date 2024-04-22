import { User } from "@prisma/client"
import React from "react"

interface IProps {
  data: User[]
}
const DataInfo = ({ data }: IProps) => {
  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default DataInfo
