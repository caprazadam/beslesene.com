"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingPage() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Yükleniyor")

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 300)

    // Animate loading text
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Yükleniyor...") return "Yükleniyor"
        if (prev === "Yükleniyor..") return "Yükleniyor..."
        if (prev === "Yükleniyor.") return "Yükleniyor.."
        return "Yükleniyor."
      })
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 z-50">
      <div className="flex flex-col items-center max-w-md px-4">
        {/* Logo with bounce animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="mb-8 relative"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/game-logo.png"
              alt="Beslesene Logo"
              width={180}
              height={180}
              priority
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* Game title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-orange-800 mb-6 text-center"
        >
          Beslesene.com
        </motion.h1>

        {/* Loading bar */}
        <div className="w-full max-w-xs mb-4">
          <div className="h-3 w-full bg-orange-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            />
          </div>
        </div>

        {/* Loading percentage */}
        <div className="flex justify-between w-full max-w-xs mb-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-700 font-medium">
            {loadingText}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-700 font-medium">
            {Math.min(loadingProgress, 100)}%
          </motion.p>
        </div>

        {/* Loading tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center text-orange-600 text-sm max-w-xs"
        >
          <p>Tavukları besleyerek BesCoin kazanın!</p>
        </motion.div>
      </div>
    </div>
  )
}
