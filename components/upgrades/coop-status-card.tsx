"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"

interface CoopStatusCardProps {
  coop: {
    id: number
    name: string
    capacity: {
      current: number
      max: number
    }
    chickens: number
    efficiency: number
    locked?: boolean
    unlockLevel?: number
    image: string
  }
  playerLevel: number
}

export function CoopStatusCard({ coop, playerLevel }: CoopStatusCardProps) {
  const capacityPercentage = (coop.chickens / coop.capacity.max) * 100
  const isLocked = coop.locked && playerLevel < (coop.unlockLevel || 0)

  return (
    <Card className={isLocked ? "border-muted bg-muted/10" : ""}>
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{coop.name}</CardTitle>
          {isLocked ? (
            <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Seviye {coop.unlockLevel}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={`${
                coop.efficiency >= 80
                  ? "bg-green-500/10 text-green-600 border-green-200"
                  : coop.efficiency >= 50
                    ? "bg-amber-500/10 text-amber-600 border-amber-200"
                    : "bg-red-500/10 text-red-600 border-red-200"
              }`}
            >
              {coop.efficiency}% Verim
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div
            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
              isLocked ? "opacity-50 grayscale" : ""
            }`}
          >
            <Image src={coop.image || "/placeholder.svg"} alt={coop.name} fill className="object-cover" />
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Lock className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            {!isLocked && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Kapasite</span>
                    <span>
                      {coop.chickens}/{coop.capacity.max} Tavuk
                    </span>
                  </div>
                  <Progress
                    value={capacityPercentage}
                    className="h-2"
                    indicatorClassName={
                      capacityPercentage >= 90
                        ? "bg-red-500"
                        : capacityPercentage >= 70
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/30 rounded-md p-1 text-center">
                    <span className="text-xs text-muted-foreground">Mevcut</span>
                    <p className="text-sm font-medium">{coop.chickens} Tavuk</p>
                  </div>
                  <div className="bg-muted/30 rounded-md p-1 text-center">
                    <span className="text-xs text-muted-foreground">Maksimum</span>
                    <p className="text-sm font-medium">{coop.capacity.max} Tavuk</p>
                  </div>
                </div>
              </>
            )}
            {isLocked && (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Seviye {coop.unlockLevel} ile açılır</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
