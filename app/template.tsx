"use client"
import {motion} from 'framer-motion'
import React from 'react'

export default function Template({children}:{children:React.ReactNode}) {
  return(
    <motion.main
   initial={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0}}
   transition={{duration:1.5}}
    >
      {children}
    </motion.main>
  )
}