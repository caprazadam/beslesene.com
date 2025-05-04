"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertCircle, Egg, Utensils, Clock } from "lucide-react"
import { DailyTasksPanel } from "@/components/gameplay/daily-tasks-panel"
import { ChickenCoop } from "@/components/gameplay/chicken-coop"
import { DailyLoginReward } from "@/components/daily-login-reward"
import { WoodenButton } from "@/components/ui/wooden-button"

export default function GameplayPage() {
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info")

  // Daily login reward state
  const [showDailyReward, setShowDailyReward] = useState(false)
  const [rewardType, setRewardType] = useState<"bescoin" | "feed">("bescoin")
  const [rewardAmount, setRewardAmount] = useState(50)
  const [streakDays, setStreakDays] = useState(1)

  // Show daily reward on page load (simulating first login of the day)
  useEffect(() => {
    // In a real app, you would check if the user has already claimed today's reward
    const hasClaimedToday = localStorage.getItem("lastRewardClaim") === new Date().toDateString()

    if (!hasClaimedToday) {
      // Simulate a small delay before showing the reward
      const timer = setTimeout(() => {
        // Randomly choose between BesCoin and Feed rewards
        const randomReward = Math.random() > 0.3 ? "bescoin" : "feed"
        setRewardType(randomReward)

        // Set reward amount based on type and streak
        if (randomReward === "bescoin") {
          setRewardAmount(50 + (streakDays > 1 ? streakDays * 10 : 0))
        } else {
          setRewardAmount(2 + (streakDays > 1 ? Math.floor(streakDays / 2) : 0))
        }

        setShowDailyReward(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [streakDays])

  // Handle collecting the daily reward
  const handleCollectReward = () => {
    // In a real app, you would update the user's balance here
    localStorage.setItem("lastRewardClaim", new Date().toDateString())

    // Show feedback message
    displayFeedback(`${rewardAmount} ${rewardType === "bescoin" ? "BesCoin" : "Yem"} kazandın!`, "success")

    setShowDailyReward(false)
  }

  // Show feedback message
  const displayFeedback = (message: string, type: "success" | "error" | "info") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setShowFeedbackMessage(true)
    setTimeout(() => {
      setShowFeedbackMessage(false)
    }, 3000)
  }

  // Handle feeding all chickens
  const handleFeedAll = () => {
    displayFeedback("Tüm tavuklar beslendi! +50 XP", "success")
  }

  // Handle collecting all eggs
  const handleCollectAll = () => {
    displayFeedback("Tüm yumurtalar toplandı! +30 XP", "success")
  }

  return (
    <div className="relative space-y-4 pb-16">
      {/* Daily Login Reward */}
      <DailyLoginReward
        isVisible={showDailyReward}
        onCollect={handleCollectReward}
        rewardType={rewardType}
        rewardAmount={rewardAmount}
        streakDays={streakDays}
      />

      {/* Game Status Card */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Çiftlik Durumu</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Seviye 5
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Sonraki Seviye
                </span>
                <span>450/1000 XP</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <WoodenButton onClick={handleFeedAll} variant="green" className="h-10">
                <Utensils className="h-4 w-4 mr-2" />
                Hepsini Besle
              </WoodenButton>
              <WoodenButton onClick={handleCollectAll} className="h-10">
                <Egg className="h-4 w-4 mr-2" />
                Yumurtaları Topla
              </WoodenButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different coops */}
      <Tabs defaultValue="coop1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="coop1">Kümes 1</TabsTrigger>
          <TabsTrigger value="coop2">Kümes 2</TabsTrigger>
          <TabsTrigger value="coop3">Kümes 3</TabsTrigger>
        </TabsList>

        <TabsContent value="coop1" className="mt-2 space-y-4">
          <ChickenCoop coopId={1} onFeedback={displayFeedback} />
        </TabsContent>

        <TabsContent value="coop2" className="mt-2 space-y-4">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
            <Image src="/lock-icon.png" alt="Locked" width={64} height={64} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Kilitli Kümes</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Bu kümesi açmak için 7. seviyeye ulaşmanız gerekiyor.
            </p>
            <WoodenButton variant="outline">Seviye 7&apos;de Açılır</WoodenButton>
          </div>
        </TabsContent>

        <TabsContent value="coop3" className="mt-2 space-y-4">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
            <Image src="/lock-icon.png" alt="Locked" width={64} height={64} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Kilitli Kümes</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Bu kümesi açmak için 10. seviyeye ulaşmanız gerekiyor.
            </p>
            <WoodenButton variant="outline">Seviye 10&apos;da Açılır</WoodenButton>
          </div>
        </TabsContent>
      </Tabs>

      {/* Daily Tasks Panel */}
      <DailyTasksPanel />

      {/* Feedback Message */}
      {showFeedbackMessage && (
        <div
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-up ${
            feedbackType === "success"
              ? "bg-green-500 text-white"
              : feedbackType === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {feedbackType === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : feedbackType === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  )
}
