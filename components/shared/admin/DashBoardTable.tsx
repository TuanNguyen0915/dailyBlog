"use client"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import DataInfo from "./DataInfo"

interface IProps {
  data: User[]
}

const DashBoardTable = ({ data }: IProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = searchParams.get("page") ?? "1"
  const per_page = searchParams.get("per_page") ?? "5"
  const start = (Number(page) - 1) * Number(per_page)
  const end = Number(page) * Number(per_page)
  const [filterData, setFilterData] = useState<User[]>(data.slice(start, end))
  useEffect(() => {
    setFilterData(data.slice(start, end))
  }, [setFilterData, data, start, end])
  return (
    <div className="space-x-4-y w-full">
      <DataInfo data={filterData} />
      <div className="flex space-x-10">
        <Button
          disabled={Number(page) === 1 || page === null}
          onClick={() => {
            router.push(`/admin/dashboard/?page=${Number(page) - 1}&per_page=5`)
          }}
        >
          Pre
        </Button>

        <Button
          disabled={filterData[4]?.email === data[data.length - 1]?.email}
          onClick={() => {
            router.push(`/admin/dashboard/?page=${Number(page) + 1}&per_page=5`)
          }}
        >
          {filterData[4]?.email === data[data.length - 1]?.email
            ? "Last"
            : "Next"}
        </Button>
      </div>
    </div>
  )
}

export default DashBoardTable
