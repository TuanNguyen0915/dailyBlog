"use client"

import { Blog, User } from "@prisma/client"
import CountUp from "react-countup"

interface IProps {
  title: string
  count: number
 
}

const DashBoardCard = ({ title, count }: IProps) => {
  

  return (
    <div className="flex h-[250px] w-[200px] flex-col items-center justify-evenly gap-2 rounded-2xl border border-border bg-black/20 shadow-lg backdrop-blur-lg dark:bg-white/10 max-sm:h-[200px] max-sm:w-[150px]">
      <p className="text-xl font-bold uppercase tracking-wide">{title}</p>
      <CountUp
        className="text-6xl font-extrabold tracking-widest text-primary max-md:text-3xl"
        end={count}
        duration={2}
      />


    </div>
  )
}

export default DashBoardCard
