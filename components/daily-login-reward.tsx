"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Package } from "lucide-react"
import { WoodenButton } from "@/components/ui/wooden-button"

interface DailyLoginRewardProps {
  isVisible: boolean
  onCollect: () => void
  rewardType: "bescoin" | "feed"
  rewardAmount: number
  streakDays: number
}

export function DailyLoginReward({
  isVisible,
  onCollect,
  rewardType,
  rewardAmount,
  streakDays,
}: DailyLoginRewardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-full max-w-sm"
          >
            <Card className="border-2 border-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent -z-10" />

              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1">
                    {streakDays} Gün Üst Üste
                  </Badge>
                </div>
                <CardTitle className="text-2xl">Günlük Ödülün!</CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-4 pb-2">
                <motion.div
                  animate={isAnimating ? { rotate: [0, -5, 5, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative mx-auto w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-300 rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                  {rewardType === "bescoin" ? (
                    <Coins className="w-12 h-12 text-amber-600" />
                  ) : (
                    <Package className="w-12 h-12 text-amber-600" />
                  )}
                </motion.div>

                <div>
                  <h3 className="text-lg font-medium mb-1">
                    {rewardAmount} {rewardType === "bescoin" ? "BesCoin" : "Yem"} Kazandın!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Her gün giriş yaparak ödüllerini topla ve daha fazla kazan!
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center pt-2 pb-4">
                <WoodenButton onClick={onCollect} variant="yellow" size="lg">
                  Ödülü Topla
                </WoodenButton>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
