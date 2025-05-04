"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Egg, Utensils } from "lucide-react"
import { WoodenButton } from "@/components/ui/wooden-button"

interface ChickenCoopProps {
  coopId: number
  onFeedback: (message: string, type: "success" | "error" | "info") => void
}

export function ChickenCoop({ coopId, onFeedback }: ChickenCoopProps) {
  // Mock data for chickens in this coop
  const [chickens, setChickens] = useState([
    {
      id: 1,
      name: "Sarı Tavuk",
      level: 3,
      hunger: 70,
      eggProgress: 45,
      image: "/placeholder.svg?key=dr8x4",
    },
    {
      id: 2,
      name: "Beyaz Tavuk",
      level: 2,
      hunger: 30,
      eggProgress: 80,
      image: "/placeholder.svg?key=2t4ml",
    },
    {
      id: 3,
      name: "Kahverengi Tavuk",
      level: 4,
      hunger: 50,
      eggProgress: 95,
      image: "/placeholder.svg?key=zzhqx",
    },
  ])

  // Handle feeding a chicken
  const handleFeed = (chickenId: number) => {
    setChickens(
      chickens.map((chicken) => {
        if (chicken.id === chickenId) {
          return {
            ...chicken,
            hunger: 100,
            eggProgress: Math.min(chicken.eggProgress + 15, 100),
          }
        }
        return chicken
      }),
    )
    onFeedback(`Tavuk beslendi! +10 XP`, "success")
  }

  // Handle collecting an egg
  const handleCollectEgg = (chickenId: number) => {
    setChickens(
      chickens.map((chicken) => {
        if (chicken.id === chickenId && chicken.eggProgress >= 100) {
          return {
            ...chicken,
            eggProgress: 0,
          }
        }
        return chicken
      }),
    )
    onFeedback(`Yumurta toplandı! +5 XP ve +1 Yumurta`, "success")
  }

  return (
    <div className="space-y-4">
      {chickens.map((chicken) => (
        <Card key={chicken.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={chicken.image || "/placeholder.svg"}
                  alt={chicken.name}
                  width={80}
                  height={80}
                  className="rounded-lg bg-muted"
                />
                <Badge className="absolute -top-1 -right-1 bg-primary">{chicken.level}</Badge>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{chicken.name}</h3>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                    Seviye {chicken.level}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center">
                      <Utensils className="h-3 w-3 mr-1" />
                      Açlık
                    </span>
                    <span>{chicken.hunger}%</span>
                  </div>
                  <Progress value={chicken.hunger} className="h-1.5" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center">
                      <Egg className="h-3 w-3 mr-1" />
                      Yumurta
                    </span>
                    <span>{chicken.eggProgress}%</span>
                  </div>
                  <Progress value={chicken.eggProgress} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-2 pt-0 flex justify-between gap-2">
            <WoodenButton
              onClick={() => handleFeed(chicken.id)}
              variant="green"
              size="sm"
              className="flex-1"
              disabled={chicken.hunger >= 100}
            >
              <Utensils className="h-3 w-3 mr-1" />
              Besle
            </WoodenButton>
            <WoodenButton
              onClick={() => handleCollectEgg(chicken.id)}
              size="sm"
              className="flex-1"
              disabled={chicken.eggProgress < 100}
            >
              <Egg className="h-3 w-3 mr-1" />
              Topla
            </WoodenButton>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
