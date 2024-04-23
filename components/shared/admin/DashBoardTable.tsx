"use client"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import DataInfo from "./DataInfo"

import { Search } from "lucide-react"

interface IProps {
  data: User[]
  updated: () => void
}

const DashBoardTable = ({ data, updated }: IProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = searchParams.get("page") ?? "1"
  const per_page = searchParams.get("per_page") ?? "5"
  const start = (Number(page) - 1) * Number(per_page)
  const end = Number(page) * Number(per_page)
  // const [filterData, setFilterData] = useState<User[]>(data.slice(start, end))
  // useEffect(() => {
  //   setFilterData(data.slice(start, end))
  // }, [setFilterData, data, start, end])
  const filterUser = useCallback(() => {
    if (!searchTerm) {
      return data.slice(start, end)
    }
    const newData = data.filter((users) => {
      if (users.email.toLowerCase().includes(searchTerm.toLowerCase()))
        return users
      if (users.username?.toLowerCase().includes(searchTerm.toLowerCase()))
        return users
    })
    return newData
  }, [searchTerm, data, end, start])
  return (
    <div className="w-full space-y-10">
      {filterUser() && (
        <>
          <div className="flexBetween w-1/2 gap-4  max-md:w-full">
            <Search size={32} />
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              value={searchTerm}
              className="flex-1 rounded-lg border border-border bg-zinc-700/80 px-2 py-1 focus:outline-primary/80"
              placeholder="Search by Email"
              autoComplete="off"
            />
          </div>
          <DataInfo data={filterUser()} updated={updated} />
          <div className="flexCenter space-x-10">
            <Button
              disabled={Number(page) === 1 || page === null}
              onClick={() => {
                router.push(
                  `/admin/dashboard/?page=${Number(page) - 1}&per_page=5`,
                )
              }}
            >
              Pre
            </Button>

            <Button
              disabled={filterUser()[4]?.email === data[data.length - 1]?.email}
              onClick={() => {
                router.push(
                  `/admin/dashboard/?page=${Number(page) + 1}&per_page=5`,
                )
              }}
            >
              {filterUser()[4]?.email === data[data.length - 1]?.email
                ? "Last"
                : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default DashBoardTable
